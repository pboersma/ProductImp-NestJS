import { IsJSON, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductMappingDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  product: number;

  @IsNotEmpty()
  @IsJSON()
  map: Record<string, any>;
}
