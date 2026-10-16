import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductSkuDto {
  @ApiProperty({ example: 'IP16-BLK-128', description: 'Unique SKU code' })
  @IsString()
  @IsNotEmpty({ message: 'SKU code is required' })
  skuCode: string;

  @ApiProperty({ example: 24990000, description: 'Price in decimal/currency' })
  @IsNumber({}, { message: 'Price must be a valid number' })
  @Min(0, { message: 'Price cannot be negative' })
  price: number;

  @ApiPropertyOptional({ example: 50, default: 0, description: 'Stock quantity' })
  @IsOptional()
  @IsInt({ message: 'Stock must be an integer' })
  @Min(0, { message: 'Stock cannot be negative' })
  stock?: number = 0;

  @ApiPropertyOptional({
    example: { color: 'Black', storage: '128GB' },
    description: 'Variant attributes as JSON object',
  })
  @IsOptional()
  @IsObject()
  attributes?: Record<string, any> = {};

  @ApiPropertyOptional({ default: true, description: 'Whether SKU is active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
