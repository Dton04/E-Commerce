import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveProductImageDto {
  @ApiProperty({
    example: '/uploads/images/example-uuid.jpg',
    description: 'Image URL to remove from product gallery',
  })
  @IsString()
  @IsNotEmpty({ message: 'Image URL is required' })
  imageUrl: string;
}
