import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateAPIConfigurationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;
}
