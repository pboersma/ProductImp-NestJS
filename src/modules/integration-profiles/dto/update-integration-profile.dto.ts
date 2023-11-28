import BaseDTO from 'src/dto/base.dto';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export default abstract class UpdateIntegrationProfileDTO implements BaseDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  url: string;
}
