import BaseDTO from 'src/dto/base.dto';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export default abstract class CreateIntegrationProfileDTO implements BaseDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;
}
