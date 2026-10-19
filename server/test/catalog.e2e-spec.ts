import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ShopMemberRole, UserRole } from '@prisma/client';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Catalog Module - Categories, Products, SKUs, Bounded Pagination (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let jwtService: JwtService;

  const timestamp = Date.now();
  const adminEmail = `admin_cat_${timestamp}@example.com`;
  const sellerEmail = `seller_cat_${timestamp}@example.com`;
  const otherSellerEmail = `other_seller_${timestamp}@example.com`;
  const customerEmail = `customer_cat_${timestamp}@example.com`;

  let adminToken: string;
  let sellerToken: string;
  let otherSellerToken: string;
  let customerToken: string;

  let testShopId: string;
  let testCategoryId: string;
  let testCategorySlug: string;
  let testSubcategoryId: string;
  let testProductId: string;
  let testProductSlug: string;
  let testSkuId: string;

  let jwtSecret: string;

  jest.setTimeout(45000);

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    );

    prisma = app.get(PrismaService);
    jwtService = app.get(JwtService);
    const configService = app.get(ConfigService);
    jwtSecret = configService.getOrThrow<string>('JWT_ACCESS_SECRET');
    await app.init();

    // Seed test users
    const adminUser = await prisma.user.create({
      data: {
        email: adminEmail,
        fullName: 'Catalog Admin',
        passwordHash: 'dummy',
        roles: { create: { role: UserRole.ADMIN } },
      },
    });
    adminToken = await jwtService.signAsync(
      { sub: adminUser.id, email: adminEmail, roles: [UserRole.ADMIN] },
      { secret: jwtSecret },
    );

    const sellerUser = await prisma.user.create({
      data: {
        email: sellerEmail,
        fullName: 'Shop Seller',
        passwordHash: 'dummy',
        roles: { create: { role: UserRole.SELLER } },
      },
    });
    sellerToken = await jwtService.signAsync(
      { sub: sellerUser.id, email: sellerEmail, roles: [UserRole.SELLER] },
      { secret: jwtSecret },
    );

    const otherSellerUser = await prisma.user.create({
      data: {
        email: otherSellerEmail,
        fullName: 'Other Seller',
        passwordHash: 'dummy',
        roles: { create: { role: UserRole.SELLER } },
      },
    });
    otherSellerToken = await jwtService.signAsync(
      { sub: otherSellerUser.id, email: otherSellerEmail, roles: [UserRole.SELLER] },
      { secret: jwtSecret },
    );

    const customerUser = await prisma.user.create({
      data: {
        email: customerEmail,
        fullName: 'Regular Customer',
        passwordHash: 'dummy',
        roles: { create: { role: UserRole.CUSTOMER } },
      },
    });
    customerToken = await jwtService.signAsync(
      { sub: customerUser.id, email: customerEmail, roles: [UserRole.CUSTOMER] },
      { secret: jwtSecret },
    );

    // Seed test shop with sellerUser as OWNER
    const shop = await prisma.shop.create({
      data: {
        name: `Tech Store ${timestamp}`,
        slug: `tech-store-${timestamp}`,
        description: 'Official electronics store',
        status: 'ACTIVE',
        members: {
          create: {
            userId: sellerUser.id,
            role: ShopMemberRole.OWNER,
          },
        },
      },
    });
    testShopId = shop.id;
  });

  afterAll(async () => {
    try {
      // Cleanup created resources in reverse dependency order
      if (testProductId) {
        await prisma.productSku.deleteMany({ where: { productId: testProductId } });
        await prisma.product.deleteMany({ where: { id: testProductId } });
      }
      if (testSubcategoryId) {
        await prisma.category.deleteMany({ where: { id: testSubcategoryId } });
      }
      if (testCategoryId) {
        await prisma.category.deleteMany({ where: { id: testCategoryId } });
      }
      if (testShopId) {
        await prisma.shopMember.deleteMany({ where: { shopId: testShopId } });
        await prisma.shop.deleteMany({ where: { id: testShopId } });
      }
      await prisma.userRoleAssignment.deleteMany({
        where: {
          user: {
            email: { in: [adminEmail, sellerEmail, otherSellerEmail, customerEmail] },
          },
        },
      });
      await prisma.user.deleteMany({
        where: {
          email: { in: [adminEmail, sellerEmail, otherSellerEmail, customerEmail] },
        },
      });
      await prisma.$disconnect();
    } catch {
      // ignore
    }
    await app.close();
  });

  describe('1. Category Management & RBAC', () => {
    it('1.1 POST /api/v1/categories -> should reject unauthenticated request with 401', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/categories')
        .send({ name: 'Laptops' })
        .expect(401);
    });

    it('1.2 POST /api/v1/categories -> should reject CUSTOMER request with 403', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/categories')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({ name: 'Laptops' })
        .expect(403);
    });

    it('1.3 POST /api/v1/categories -> should allow ADMIN to create root category', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: `Electronics ${timestamp}`,
          description: 'Phones, laptops, accessories',
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe(`Electronics ${timestamp}`);
      expect(res.body.slug).toBe(`electronics-${timestamp}`);
      testCategoryId = res.body.id;
      testCategorySlug = res.body.slug;
    });

    it('1.4 POST /api/v1/categories -> should allow ADMIN to create subcategory with parentId', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: `Smartphones ${timestamp}`,
          parentId: testCategoryId,
        })
        .expect(201);

      expect(res.body.parentId).toBe(testCategoryId);
      testSubcategoryId = res.body.id;
    });

    it('1.5 POST /api/v1/categories -> should reject duplicate category slug with 409', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: `Electronics ${timestamp}`,
          slug: testCategorySlug,
        })
        .expect(409);
    });

    it('1.6 GET /api/v1/categories -> public listing with subcategories and product counts', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/categories')
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      const rootCat = res.body.find((c: any) => c.id === testCategoryId);
      expect(rootCat).toBeDefined();
      expect(rootCat.children.length).toBeGreaterThanOrEqual(1);
    });

    it('1.7 GET /api/v1/categories/:idOrSlug -> public fetch by slug', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/categories/${testCategorySlug}`)
        .expect(200);

      expect(res.body.id).toBe(testCategoryId);
      expect(res.body.slug).toBe(testCategorySlug);
    });
  });

  describe('2. Product & SKU Creation with Permissions', () => {
    it('2.1 POST /api/v1/products -> 401 when unauthenticated', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/products')
        .send({
          shopId: testShopId,
          categoryId: testSubcategoryId,
          name: 'iPhone 16 Pro',
        })
        .expect(401);
    });

    it('2.2 POST /api/v1/products -> 403 when seller does not belong to the shop', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/products')
        .set('Authorization', `Bearer ${otherSellerToken}`)
        .send({
          shopId: testShopId,
          categoryId: testSubcategoryId,
          name: 'iPhone 16 Pro',
          skus: [
            {
              skuCode: `IP16-BLK-${timestamp}`,
              price: 25000000,
              stock: 10,
            },
          ],
        })
        .expect(403);
    });

    it('2.3 POST /api/v1/products -> 400 when duplicate SKU codes are sent in request', async () => {
      const dupSkuCode = `DUP-${timestamp}`;
      await request(app.getHttpServer())
        .post('/api/v1/products')
        .set('Authorization', `Bearer ${sellerToken}`)
        .send({
          shopId: testShopId,
          categoryId: testSubcategoryId,
          name: 'iPhone 16 Pro Duplicate SKU',
          skus: [
            { skuCode: dupSkuCode, price: 20000000 },
            { skuCode: dupSkuCode, price: 22000000 },
          ],
        })
        .expect(400);
    });

    it('2.4 POST /api/v1/products -> 201 created atomically with initial SKUs by shop seller', async () => {
      const skuCode1 = `IP16-BLK-128-${timestamp}`;
      const skuCode2 = `IP16-WHT-256-${timestamp}`;

      const res = await request(app.getHttpServer())
        .post('/api/v1/products')
        .set('Authorization', `Bearer ${sellerToken}`)
        .send({
          shopId: testShopId,
          categoryId: testSubcategoryId,
          name: `iPhone 16 Pro Titanium ${timestamp}`,
          description: 'Next-gen flagship with A18 Pro chip',
          images: ['https://example.com/ip16-front.jpg', 'https://example.com/ip16-back.jpg'],
          commissionRate: 0.05,
          skus: [
            {
              skuCode: skuCode1,
              price: 28990000,
              stock: 50,
              attributes: { color: 'Black Titanium', storage: '128GB' },
            },
            {
              skuCode: skuCode2,
              price: 31990000,
              stock: 30,
              attributes: { color: 'White Titanium', storage: '256GB' },
            },
          ],
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe(`iPhone 16 Pro Titanium ${timestamp}`);
      expect(res.body.skus).toHaveLength(2);
      expect(res.body.skus[0].skuCode).toBe(skuCode1);

      testProductId = res.body.id;
      testProductSlug = res.body.slug;
      testSkuId = res.body.skus[0].id;
    });

    it('2.5 POST /api/v1/products -> 409 when creating duplicate slug in same shop', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/products')
        .set('Authorization', `Bearer ${sellerToken}`)
        .send({
          shopId: testShopId,
          categoryId: testSubcategoryId,
          name: `iPhone 16 Pro Titanium ${timestamp}`,
          slug: testProductSlug,
        })
        .expect(409);
    });

    it('2.6 POST /api/v1/products -> 409 when SKU code already exists globally', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/products')
        .set('Authorization', `Bearer ${sellerToken}`)
        .send({
          shopId: testShopId,
          categoryId: testSubcategoryId,
          name: `iPhone 16 Variant ${timestamp}`,
          skus: [
            {
              skuCode: `IP16-BLK-128-${timestamp}`, // existing SKU code
              price: 25000000,
            },
          ],
        })
        .expect(409);
    });
  });

  describe('3. Public Search, Filter & Bounded Pagination', () => {
    it('3.1 GET /api/v1/products -> public paginated list with metadata', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/products?page=1&limit=5')
        .expect(200);

      expect(res.body).toHaveProperty('data');
      expect(res.body).toHaveProperty('meta');
      expect(res.body.meta.page).toBe(1);
      expect(res.body.meta.limit).toBe(5);
      expect(typeof res.body.meta.total).toBe('number');
      expect(typeof res.body.meta.totalPages).toBe('number');
    });

    it('3.2 GET /api/v1/products?limit=100 -> strictly enforced bounded limit (Max 50 rejects with 400)', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/products?limit=100')
        .expect(400);

      expect(JSON.stringify(res.body)).toContain('limit must not be greater than 50');
    });

    it('3.3 GET /api/v1/products?page=0 -> rejects invalid page < 1 with 400', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/products?page=0')
        .expect(400);

      expect(JSON.stringify(res.body)).toContain('page must not be less than 1');
    });

    it('3.4 GET /api/v1/products?limit=0 -> rejects invalid limit < 1 with 400', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/products?limit=0')
        .expect(400);

      expect(JSON.stringify(res.body)).toContain('limit must not be less than 1');
    });

    it('3.5 GET /api/v1/products?minPrice=50000000&maxPrice=10000000 -> rejects invalid range with 400', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/products?minPrice=50000000&maxPrice=10000000')
        .expect(400);

      expect(res.body.message).toContain('minPrice cannot be greater than maxPrice');
    });

    it('3.6 GET /api/v1/products?search=nonexistent_xyz -> returns empty result with clean metadata', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/products?search=nonexistent_xyz_completely_random_999999')
        .expect(200);

      expect(res.body.data).toEqual([]);
      expect(res.body.meta.total).toBe(0);
      expect(res.body.meta.totalPages).toBe(0);
      expect(res.body.meta.hasNextPage).toBe(false);
      expect(res.body.meta.hasPrevPage).toBe(false);
    });

    it('3.7 GET /api/v1/products?sortBy=invalid_sort -> rejects non-whitelisted sort with 400', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/products?sortBy=invalid_column_name')
        .expect(400);
    });

    it('3.8 GET /api/v1/products?search=...&categoryId=...&shopId=...&minPrice=...&maxPrice=...&sortBy=newest -> query combinations work correctly', async () => {
      const res = await request(app.getHttpServer())
        .get(
          `/api/v1/products?search=${timestamp}&categoryId=${testSubcategoryId}&shopId=${testShopId}&minPrice=20000000&maxPrice=35000000&sortBy=newest&page=1&limit=10`,
        )
        .expect(200);

      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
      const found = res.body.data.find((p: any) => p.id === testProductId);
      expect(found).toBeDefined();
      expect(res.body.meta.page).toBe(1);
      expect(res.body.meta.limit).toBe(10);
    });

    it('3.9 GET /api/v1/products/:idOrSlug -> public detail with active SKUs', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/products/${testProductSlug}`)
        .expect(200);

      expect(res.body.id).toBe(testProductId);
      expect(res.body.category.id).toBe(testSubcategoryId);
      expect(res.body.shop.id).toBe(testShopId);
      expect(res.body.skus.length).toBe(2);
    });
  });

  describe('4. SKU Management & Product Lifecycle', () => {
    it('4.1 POST /api/v1/products/:id/skus -> seller can add a new SKU variant', async () => {
      const newSkuCode = `IP16-GLD-512-${timestamp}`;
      const res = await request(app.getHttpServer())
        .post(`/api/v1/products/${testProductId}/skus`)
        .set('Authorization', `Bearer ${sellerToken}`)
        .send({
          skuCode: newSkuCode,
          price: 36990000,
          stock: 15,
          attributes: { color: 'Desert Titanium', storage: '512GB' },
        })
        .expect(201);

      expect(res.body.skuCode).toBe(newSkuCode);
      expect(Number(res.body.price)).toBe(36990000);
    });

    it('4.2 PATCH /api/v1/products/skus/:skuId -> seller can update price & stock', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/products/skus/${testSkuId}`)
        .set('Authorization', `Bearer ${sellerToken}`)
        .send({
          price: 27990000,
          stock: 45,
        })
        .expect(200);

      expect(Number(res.body.price)).toBe(27990000);
      expect(res.body.stock).toBe(45);
    });

    it('4.3 DELETE /api/v1/products/skus/:skuId -> seller can deactivate/delete SKU', async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/products/skus/${testSkuId}`)
        .set('Authorization', `Bearer ${sellerToken}`)
        .expect(200);
    });

    it('4.4 DELETE /api/v1/products/:id -> seller can archive product', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/api/v1/products/${testProductId}`)
        .set('Authorization', `Bearer ${sellerToken}`)
        .expect(200);

      expect(res.body.message).toContain('archived');
    });

    it('4.5 GET /api/v1/products/:id -> archived product is not accessible publicly (404)', async () => {
      await request(app.getHttpServer())
        .get(`/api/v1/products/${testProductId}`)
        .expect(404);
    });
  });
});
