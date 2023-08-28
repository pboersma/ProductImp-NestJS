import { IsBoolean, IsString, IsUrl } from 'class-validator';

export class UpdateAPIConfigurationDto {
  @IsString()
  name: string;

  @IsUrl()
  url: string;

  @IsString()
  authentication: string;

  @IsBoolean()
  autoSync: boolean;
}
