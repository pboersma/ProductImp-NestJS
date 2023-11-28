import BaseDTO from 'src/dto/base.dto';
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { IntegrationType } from 'src/types/integration-profiles.types';

export default abstract class UpdateIntegrationProfileDTO implements BaseDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsEnum(IntegrationType)
  type: IntegrationType;
}
