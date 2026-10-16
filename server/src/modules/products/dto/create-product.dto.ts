import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ProductStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateProductSkuDto } from './create-sku.dto';

export class CreateProductDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Shop UUID owning this product',
  })
  @IsUUID('all', { message: 'Shop ID must be a valid UUID' })
  shopId: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174001',
    description: 'Category UUID for this product',
  })
  @IsUUID('all', { message: 'Category ID must be a valid UUID' })
  categoryId: string;

  @ApiProperty({ example: 'iPhone 16 Pro Max', description: 'Product name' })
  @IsString()
  @IsNotEmpty({ message: 'Product name is required' })
  name: string;

  @ApiPropertyOptional({
    example: 'iphone-16-pro-max',
    description: 'Product slug (unique within the shop, auto-generated if omitted)',
  })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({ example: 'Apple flagship smartphone', description: 'Description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: ['https://example.com/img1.jpg'],
    type: [String],
    description: 'Array of image URLs',
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[] = [];

  @ApiPropertyOptional({
    enum: ProductStatus,
    default: ProductStatus.PUBLISHED,
    description: 'Product status',
  })
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus = ProductStatus.PUBLISHED;

  @ApiPropertyOptional({
    example: 0.08,
    minimum: 0,
    maximum: 1,
    description: 'Custom affiliate commission rate (e.g. 0.08 = 8%)',
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  commissionRate?: number;

  @ApiPropertyOptional({
    type: [CreateProductSkuDto],
    description: 'Initial list of SKU variants for this product',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductSkuDto)
  skus?: CreateProductSkuDto[] = [];
}
