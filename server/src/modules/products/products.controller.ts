import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import {
  AuthenticatedUser,
  CurrentUser,
} from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { multerImageUploadOptions } from '../upload/multer.config';
import { UploadService } from '../upload/upload.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductSkuDto } from './dto/create-sku.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { RemoveProductImageDto } from './dto/remove-image.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductSkuDto } from './dto/update-sku.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly uploadService: UploadService,
  ) {}

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Search & filter products with bounded pagination (Public)',
  })
  @ApiResponse({ status: 200, description: 'Paginated list of products' })
  async findAll(@Query() filter: ProductFilterDto) {
    return this.productsService.findAll(filter, true);
  }

  @Public()
  @Get(':idOrSlug')
  @ApiOperation({ summary: 'Get product detail by UUID or slug (Public)' })
  @ApiResponse({ status: 200, description: 'Product detail with active SKUs' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async findOne(@Param('idOrSlug') idOrSlug: string) {
    return this.productsService.findOne(idOrSlug, true);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create new product with initial SKUs (SELLER/ADMIN)' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 403, description: 'Forbidden - not a member of shop' })
  @ApiResponse({ status: 409, description: 'Slug or SKU conflict' })
  async create(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateProductDto,
  ) {
    return this.productsService.create(user.userId, user.roles, dto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update product information (SELLER/ADMIN)' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async update(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, user.userId, user.roles, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Archive/soft-delete product (SELLER/ADMIN)' })
  @ApiResponse({ status: 200, description: 'Product archived successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.productsService.removeProduct(id, user.userId, user.roles);
  }

  @Post(':id/skus')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(RolesGuard)
  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Add a new SKU variant to product (SELLER/ADMIN)' })
  @ApiResponse({ status: 201, description: 'SKU created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 409, description: 'SKU code already exists' })
  async addSku(
    @Param('id') productId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateProductSkuDto,
  ) {
    return this.productsService.addSku(productId, user.userId, user.roles, dto);
  }

  @Patch('skus/:skuId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update SKU variant details (SELLER/ADMIN)' })
  @ApiResponse({ status: 200, description: 'SKU updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'SKU not found' })
  async updateSku(
    @Param('skuId') skuId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateProductSkuDto,
  ) {
    return this.productsService.updateSku(skuId, user.userId, user.roles, dto);
  }

  @Delete('skus/:skuId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Deactivate or delete SKU variant (SELLER/ADMIN)' })
  @ApiResponse({ status: 200, description: 'SKU deleted or deactivated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'SKU not found' })
  async removeSku(
    @Param('skuId') skuId: string,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.productsService.removeSku(skuId, user.userId, user.roles);
  }

  @Post(':id/images')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RolesGuard)
  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @UseInterceptors(FilesInterceptor('images', 10, multerImageUploadOptions))
  @ApiOperation({
    summary: 'Upload and append images directly to product (SELLER/ADMIN)',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description:
            'Image files to add to product gallery (max 10 files, 5MB each)',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Images uploaded and added to product successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'No files provided or invalid file format',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async uploadProductImages(
    @Param('id') productId: string,
    @CurrentUser() user: AuthenticatedUser,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one image file is required');
    }
    const { urls } = this.uploadService.formatFilesResponse(files);
    return this.productsService.addProductImages(
      productId,
      user.userId,
      user.roles,
      urls,
    );
  }

  @Delete(':id/images')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SELLER, UserRole.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Remove an image from product gallery (SELLER/ADMIN)',
  })
  @ApiResponse({ status: 200, description: 'Image removed from product' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  async removeProductImage(
    @Param('id') productId: string,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: RemoveProductImageDto,
  ) {
    const updatedProduct = await this.productsService.removeProductImage(
      productId,
      user.userId,
      user.roles,
      dto.imageUrl,
    );
    this.uploadService.deleteFile(dto.imageUrl);
    return updatedProduct;
  }
}
