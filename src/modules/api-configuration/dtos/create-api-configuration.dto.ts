import { IsNotEmpty } from 'class-validator';

export class CreateAPIConfigurationDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  url: string;
}
