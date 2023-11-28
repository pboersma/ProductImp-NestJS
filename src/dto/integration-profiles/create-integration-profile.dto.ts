import BaseDTO from 'src/dto/base.dto';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { IntegrationType } from 'src/types/integration-profiles.types';

export default abstract class CreateIntegrationProfileDTO implements BaseDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsEnum(IntegrationType)
  type: IntegrationType;

  @IsOptional()
  @IsBoolean()
  is_synchronizable: boolean; // TODO: Change name, Is not descriptive of the actual situation.
}
