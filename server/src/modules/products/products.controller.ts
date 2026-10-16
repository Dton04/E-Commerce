import {
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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
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
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductSkuDto } from './dto/create-sku.dto';
import { ProductFilterDto } from './dto/product-filter.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductSkuDto } from './dto/update-sku.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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
}
