import { IsJSON, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductMappingDto {
  @IsNotEmpty()
  @IsNumber()
  product: number;

  @IsNotEmpty()
  @IsJSON()
  map: Record<string, any>;
}
