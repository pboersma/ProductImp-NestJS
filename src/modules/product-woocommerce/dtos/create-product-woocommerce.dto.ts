import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductWoocommerceDto {
  @IsNotEmpty()
  @IsNumber()
  product: number;
}
