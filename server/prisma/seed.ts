import 'dotenv/config';
import {
  PrismaClient,
  UserRole,
  ShopMemberRole,
  ShopStatus,
  ProductStatus,
  Prisma,
} from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Roles and Users
  const passwordHash = await bcrypt.hash('Password123!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@ecommerce.test' },
    update: {},
    create: {
      email: 'admin@ecommerce.test',
      fullName: 'System Administrator',
      passwordHash,
      roles: {
        create: [{ role: UserRole.ADMIN }],
      },
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  const seller = await prisma.user.upsert({
    where: { email: 'seller@ecommerce.test' },
    update: {},
    create: {
      email: 'seller@ecommerce.test',
      fullName: 'Apple Authorized Seller',
      phone: '0901234567',
      passwordHash,
      roles: {
        create: [{ role: UserRole.SELLER }, { role: UserRole.CUSTOMER }],
      },
    },
  });
  console.log(`✅ Seller user seeded: ${seller.email}`);

  const customer = await prisma.user.upsert({
    where: { email: 'customer@ecommerce.test' },
    update: {},
    create: {
      email: 'customer@ecommerce.test',
      fullName: 'Nguyen Van A',
      phone: '0987654321',
      passwordHash,
      roles: {
        create: [{ role: UserRole.CUSTOMER }],
      },
    },
  });
  console.log(`✅ Customer user seeded: ${customer.email}`);

  // 2. Seed Shops
  const appleShop = await prisma.shop.upsert({
    where: { slug: 'apple-authorized-store' },
    update: {},
    create: {
      name: 'Apple Authorized Store',
      slug: 'apple-authorized-store',
      description: 'Official Apple products with warranty in Vietnam',
      logoUrl: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=300',
      status: ShopStatus.ACTIVE,
      members: {
        create: {
          userId: seller.id,
          role: ShopMemberRole.OWNER,
        },
      },
    },
  });
  console.log(`✅ Shop seeded: ${appleShop.name}`);

  // 3. Seed Categories (Hierarchical)
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Computers, phones, gadgets, and consumer electronics',
    },
  });

  const smartphones = await prisma.category.upsert({
    where: { slug: 'smartphones' },
    update: {},
    create: {
      name: 'Smartphones',
      slug: 'smartphones',
      description: 'Latest iOS and Android flagship smartphones',
      parentId: electronics.id,
    },
  });

  const laptops = await prisma.category.upsert({
    where: { slug: 'laptops' },
    update: {},
    create: {
      name: 'Laptops',
      slug: 'laptops',
      description: 'High performance productivity laptops and workstations',
      parentId: electronics.id,
    },
  });

  const audio = await prisma.category.upsert({
    where: { slug: 'audio-headphones' },
    update: {},
    create: {
      name: 'Audio & Headphones',
      slug: 'audio-headphones',
      description: 'Wireless earbuds, noise-cancelling headphones, and sound systems',
      parentId: electronics.id,
    },
  });
  console.log('✅ Categories seeded: Electronics -> Smartphones, Laptops, Audio');

  // 4. Seed Products and Variants (SKUs)
  const productsData = [
    {
      name: 'iPhone 16 Pro Max',
      slug: 'iphone-16-pro-max',
      description:
        'Features Grade 5 titanium design, A18 Pro chip, 48MP Fusion Camera, and industry-leading battery life with Camera Control button.',
      images: [
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800',
        'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800',
      ],
      categoryId: smartphones.id,
      shopId: appleShop.id,
      commissionRate: new Prisma.Decimal('0.0600'),
      skus: [
        {
          skuCode: 'IP16PM-BLK-256',
          price: new Prisma.Decimal('34990000.00'),
          stock: 45,
          attributes: { color: 'Black Titanium', storage: '256GB' },
        },
        {
          skuCode: 'IP16PM-NAT-256',
          price: new Prisma.Decimal('34990000.00'),
          stock: 35,
          attributes: { color: 'Natural Titanium', storage: '256GB' },
        },
        {
          skuCode: 'IP16PM-DES-512',
          price: new Prisma.Decimal('40990000.00'),
          stock: 20,
          attributes: { color: 'Desert Titanium', storage: '512GB' },
        },
        {
          skuCode: 'IP16PM-WHT-1TB',
          price: new Prisma.Decimal('46990000.00'),
          stock: 12,
          attributes: { color: 'White Titanium', storage: '1TB' },
        },
      ],
    },
    {
      name: 'MacBook Pro 14 M4',
      slug: 'macbook-pro-14-m4',
      description:
        'Next-generation M4 Pro chip with 14-core CPU, 20-core GPU, Liquid Retina XDR display, and up to 24 hours of battery life.',
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
      ],
      categoryId: laptops.id,
      shopId: appleShop.id,
      commissionRate: new Prisma.Decimal('0.0500'),
      skus: [
        {
          skuCode: 'MBP14-M4-16-512-SLV',
          price: new Prisma.Decimal('39990000.00'),
          stock: 25,
          attributes: { color: 'Silver', ram: '16GB', storage: '512GB SSD' },
        },
        {
          skuCode: 'MBP14-M4-24-1TB-BLK',
          price: new Prisma.Decimal('49990000.00'),
          stock: 18,
          attributes: { color: 'Space Black', ram: '24GB', storage: '1TB SSD' },
        },
      ],
    },
    {
      name: 'Sony WH-1000XM5 Wireless Headphones',
      slug: 'sony-wh-1000xm5',
      description:
        'Industry-leading noise canceling with two processors, eight microphones, Auto NC Optimizer, and up to 30-hour battery life.',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
      ],
      categoryId: audio.id,
      shopId: appleShop.id,
      commissionRate: new Prisma.Decimal('0.0800'),
      skus: [
        {
          skuCode: 'SONY-XM5-BLK',
          price: new Prisma.Decimal('7990000.00'),
          stock: 60,
          attributes: { color: 'Black', type: 'Over-Ear' },
        },
        {
          skuCode: 'SONY-XM5-SLV',
          price: new Prisma.Decimal('7990000.00'),
          stock: 40,
          attributes: { color: 'Platinum Silver', type: 'Over-Ear' },
        },
        {
          skuCode: 'SONY-XM5-BLU',
          price: new Prisma.Decimal('8290000.00'),
          stock: 30,
          attributes: { color: 'Midnight Blue', type: 'Over-Ear' },
        },
      ],
    },
    {
      name: 'AirPods Pro 2 (USB-C)',
      slug: 'airpods-pro-2-usbc',
      description:
        'Active Noise Cancellation with Adaptive Audio, Transparency mode, Conversation Awareness, and MagSafe Case (USB-C).',
      images: [
        'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800',
      ],
      categoryId: audio.id,
      shopId: appleShop.id,
      commissionRate: new Prisma.Decimal('0.0700'),
      skus: [
        {
          skuCode: 'APP2-USBC-WHT',
          price: new Prisma.Decimal('5490000.00'),
          stock: 100,
          attributes: { color: 'White', case: 'MagSafe USB-C' },
        },
      ],
    },
    {
      name: 'Samsung Galaxy S24 Ultra',
      slug: 'samsung-galaxy-s24-ultra',
      description:
        'Galaxy AI-powered flagship with Titanium frame, 200MP camera with Quad Telephoto, S Pen included, and Snapdragon 8 Gen 3 for Galaxy.',
      images: [
        'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800',
      ],
      categoryId: smartphones.id,
      shopId: appleShop.id,
      commissionRate: new Prisma.Decimal('0.0600'),
      skus: [
        {
          skuCode: 'SGS24U-GRY-256',
          price: new Prisma.Decimal('27990000.00'),
          stock: 35,
          attributes: { color: 'Titanium Gray', storage: '256GB' },
        },
        {
          skuCode: 'SGS24U-BLK-512',
          price: new Prisma.Decimal('32990000.00'),
          stock: 22,
          attributes: { color: 'Titanium Black', storage: '512GB' },
        },
        {
          skuCode: 'SGS24U-YEL-256',
          price: new Prisma.Decimal('27990000.00'),
          stock: 18,
          attributes: { color: 'Titanium Yellow', storage: '256GB' },
        },
      ],
    },
  ];

  for (const p of productsData) {
    const existing = await prisma.product.findUnique({
      where: {
        shopId_slug: {
          shopId: p.shopId,
          slug: p.slug,
        },
      },
    });

    if (!existing) {
      const product = await prisma.product.create({
        data: {
          name: p.name,
          slug: p.slug,
          description: p.description,
          images: p.images,
          status: ProductStatus.PUBLISHED,
          commissionRate: p.commissionRate,
          categoryId: p.categoryId,
          shopId: p.shopId,
          skus: {
            create: p.skus,
          },
        },
        include: {
          skus: true,
        },
      });
      console.log(`✅ Seeded product: ${product.name} with ${product.skus.length} SKUs`);
    } else {
      console.log(`ℹ️ Product '${p.name}' already exists, skipping.`);
    }
  }

  console.log('\n🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
