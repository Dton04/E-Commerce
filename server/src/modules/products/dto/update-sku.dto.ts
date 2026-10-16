import { PartialType } from '@nestjs/swagger';
import { CreateProductSkuDto } from './create-sku.dto';

export class UpdateProductSkuDto extends PartialType(CreateProductSkuDto) {}
