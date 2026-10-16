import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

// Omit shopId (a product cannot change shop ownership) and skus (SKUs are updated individually)
export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['shopId', 'skus'] as const),
) {}
