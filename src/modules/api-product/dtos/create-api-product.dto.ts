import { IsJSON, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { APIConfiguration } from 'src/shared/entities/api-configuration.entity';

export class CreateAPIProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsJSON()
  product: Record<string, any>;

  @IsNotEmpty()
  @IsNumber()
  configuration: APIConfiguration;
}
