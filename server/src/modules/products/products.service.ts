import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, ProductStatus, UserRole } from '@prisma/client';
import { PaginatedResult } from '../../common/dto/pagination.dto';
import { slugify } from '../../common/utils/slug.util';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductSkuDto } from './dto/create-sku.dto';
import { ProductFilterDto, ProductSortBy } from './dto/product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductSkuDto } from './dto/update-sku.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  private async assertShopAccess(
    shopId: string,
    userId: string,
    userRoles: UserRole[],
  ) {
    if (userRoles.includes(UserRole.ADMIN)) {
      return;
    }
    const member = await this.prisma.shopMember.findUnique({
      where: {
        shopId_userId: {
          shopId,
          userId,
        },
      },
    });

    if (!member) {
      throw new ForbiddenException(
        'You do not have permission to manage products for this shop',
      );
    }
  }

  async create(userId: string, userRoles: UserRole[], dto: CreateProductDto) {
    const shop = await this.prisma.shop.findUnique({
      where: { id: dto.shopId },
    });
    if (!shop) {
      throw new NotFoundException(`Shop with ID '${dto.shopId}' not found`);
    }

    await this.assertShopAccess(dto.shopId, userId, userRoles);

    const category = await this.prisma.category.findUnique({
      where: { id: dto.categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `Category with ID '${dto.categoryId}' not found`,
      );
    }

    const slug = dto.slug ? slugify(dto.slug) : slugify(dto.name);
    const existingSlug = await this.prisma.product.findUnique({
      where: {
        shopId_slug: {
          shopId: dto.shopId,
          slug,
        },
      },
    });

    if (existingSlug) {
      throw new ConflictException(
        `Product slug '${slug}' already exists in this shop`,
      );
    }

    if (dto.skus && dto.skus.length > 0) {
      const skuCodes = dto.skus.map((s) => s.skuCode);
      const uniqueCodes = new Set(skuCodes);
      if (uniqueCodes.size !== skuCodes.length) {
        throw new BadRequestException('Duplicate SKU codes in the request payload');
      }

      const existingSkus = await this.prisma.productSku.findMany({
        where: { skuCode: { in: skuCodes } },
        select: { skuCode: true },
      });
      if (existingSkus.length > 0) {
        throw new ConflictException(
          `SKU code '${existingSkus.map((s) => s.skuCode).join(', ')}' already exists`,
        );
      }
    }

    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          shopId: dto.shopId,
          categoryId: dto.categoryId,
          name: dto.name,
          slug,
          description: dto.description,
          images: dto.images ?? [],
          status: dto.status ?? ProductStatus.PUBLISHED,
          commissionRate:
            dto.commissionRate !== undefined
              ? new Prisma.Decimal(dto.commissionRate)
              : null,
          skus: dto.skus && dto.skus.length > 0
            ? {
              create: dto.skus.map((sku) => ({
                skuCode: sku.skuCode,
                price: new Prisma.Decimal(sku.price),
                stock: sku.stock ?? 0,
                attributes: (sku.attributes ?? {}) as Prisma.InputJsonValue,
                isActive: sku.isActive ?? true,
              })),
            }
            : undefined,
        },
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
          shop: {
            select: { id: true, name: true, slug: true, logoUrl: true },
          },
          skus: true,
        },
      });

      return product;
    });
  }

  async findAll(
    filter: ProductFilterDto,
    isPublic = true,
  ): Promise<PaginatedResult<any>> {
    const page = Number(filter.page) || 1;
    const limit = Math.min(Number(filter.limit) || 10, 50);
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};

    if (isPublic) {
      where.status = ProductStatus.PUBLISHED;
    } else if (filter.status) {
      where.status = filter.status;
    }

    if (filter.shopId) {
      where.shopId = filter.shopId;
    }

    if (filter.categoryId) {
      where.categoryId = filter.categoryId;
    }

    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search, mode: 'insensitive' } },
        { description: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    if (filter.minPrice !== undefined || filter.maxPrice !== undefined) {
      where.skus = {
        some: {
          isActive: true,
          price: {
            ...(filter.minPrice !== undefined
              ? { gte: new Prisma.Decimal(filter.minPrice) }
              : {}),
            ...(filter.maxPrice !== undefined
              ? { lte: new Prisma.Decimal(filter.maxPrice) }
              : {}),
          },
        },
      };
    }

    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    if (filter.sortBy === ProductSortBy.OLDEST) {
      orderBy = { createdAt: 'asc' };
    } else if (filter.sortBy === ProductSortBy.NAME_ASC) {
      orderBy = { name: 'asc' };
    }

    const [total, data] = await Promise.all([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          shop: { select: { id: true, name: true, slug: true, logoUrl: true } },
          skus: {
            where: isPublic ? { isActive: true } : undefined,
            orderBy: { price: 'asc' },
          },
        },
        skip,
        take: limit,
        orderBy,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async findOne(idOrSlug: string, isPublic = true) {
    const isUuid =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        idOrSlug,
      );

    const product = await this.prisma.product.findFirst({
      where: isUuid
        ? { id: idOrSlug }
        : { slug: idOrSlug },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        shop: { select: { id: true, name: true, slug: true, logoUrl: true } },
        skus: {
          where: isPublic ? { isActive: true } : undefined,
          orderBy: { price: 'asc' },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product '${idOrSlug}' not found`);
    }

    if (isPublic && product.status !== ProductStatus.PUBLISHED) {
      throw new NotFoundException(`Product '${idOrSlug}' is not published`);
    }

    return product;
  }

  async update(
    id: string,
    userId: string,
    userRoles: UserRole[],
    dto: UpdateProductDto,
  ) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID '${id}' not found`);
    }

    await this.assertShopAccess(product.shopId, userId, userRoles);

    if (dto.categoryId) {
      const category = await this.prisma.category.findUnique({
        where: { id: dto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(
          `Category with ID '${dto.categoryId}' not found`,
        );
      }
    }

    let slug = product.slug;
    if (dto.slug || dto.name) {
      const targetSlug = dto.slug ? slugify(dto.slug) : slugify(dto.name!);
      if (targetSlug !== product.slug) {
        const existing = await this.prisma.product.findUnique({
          where: {
            shopId_slug: {
              shopId: product.shopId,
              slug: targetSlug,
            },
          },
        });
        if (existing && existing.id !== id) {
          throw new ConflictException(
            `Slug '${targetSlug}' is already in use in this shop`,
          );
        }
        slug = targetSlug;
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        name: dto.name,
        slug,
        categoryId: dto.categoryId,
        description: dto.description,
        images: dto.images,
        status: dto.status,
        commissionRate:
          dto.commissionRate !== undefined
            ? new Prisma.Decimal(dto.commissionRate)
            : undefined,
      },
      include: {
        category: { select: { id: true, name: true, slug: true } },
        shop: { select: { id: true, name: true, slug: true, logoUrl: true } },
        skus: true,
      },
    });
  }

  async addSku(
    productId: string,
    userId: string,
    userRoles: UserRole[],
    dto: CreateProductSkuDto,
  ) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID '${productId}' not found`);
    }

    await this.assertShopAccess(product.shopId, userId, userRoles);

    const existingSku = await this.prisma.productSku.findUnique({
      where: { skuCode: dto.skuCode },
    });
    if (existingSku) {
      throw new ConflictException(
        `SKU code '${dto.skuCode}' is already registered`,
      );
    }

    return this.prisma.productSku.create({
      data: {
        productId,
        skuCode: dto.skuCode,
        price: new Prisma.Decimal(dto.price),
        stock: dto.stock ?? 0,
        attributes: (dto.attributes ?? {}) as Prisma.InputJsonValue,
        isActive: dto.isActive ?? true,
      },
    });
  }

  async updateSku(
    skuId: string,
    userId: string,
    userRoles: UserRole[],
    dto: UpdateProductSkuDto,
  ) {
    const sku = await this.prisma.productSku.findUnique({
      where: { id: skuId },
      include: { product: true },
    });
    if (!sku) {
      throw new NotFoundException(`SKU with ID '${skuId}' not found`);
    }

    await this.assertShopAccess(sku.product.shopId, userId, userRoles);

    if (dto.skuCode && dto.skuCode !== sku.skuCode) {
      const existing = await this.prisma.productSku.findUnique({
        where: { skuCode: dto.skuCode },
      });
      if (existing && existing.id !== skuId) {
        throw new ConflictException(
          `SKU code '${dto.skuCode}' is already in use`,
        );
      }
    }

    return this.prisma.productSku.update({
      where: { id: skuId },
      data: {
        skuCode: dto.skuCode,
        price: dto.price !== undefined ? new Prisma.Decimal(dto.price) : undefined,
        stock: dto.stock,
        attributes: dto.attributes ? (dto.attributes as Prisma.InputJsonValue) : undefined,
        isActive: dto.isActive,
      },
    });
  }

  async removeSku(skuId: string, userId: string, userRoles: UserRole[]) {
    const sku = await this.prisma.productSku.findUnique({
      where: { id: skuId },
      include: {
        product: true,
        _count: {
          select: {
            orderItems: true,
            cartItems: true,
          },
        },
      },
    });

    if (!sku) {
      throw new NotFoundException(`SKU with ID '${skuId}' not found`);
    }

    await this.assertShopAccess(sku.product.shopId, userId, userRoles);

    if (sku._count.orderItems > 0 || sku._count.cartItems > 0) {
      await this.prisma.productSku.update({
        where: { id: skuId },
        data: { isActive: false },
      });
      return {
        message:
          'SKU is linked to orders/carts and has been deactivated (soft-deleted)',
      };
    }

    await this.prisma.productSku.delete({ where: { id: skuId } });
    return { message: 'SKU deleted successfully' };
  }

  async removeProduct(
    productId: string,
    userId: string,
    userRoles: UserRole[],
  ) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID '${productId}' not found`);
    }

    await this.assertShopAccess(product.shopId, userId, userRoles);

    await this.prisma.product.update({
      where: { id: productId },
      data: { status: ProductStatus.ARCHIVED },
    });

    return { message: `Product '${product.name}' archived successfully` };
  }
}
