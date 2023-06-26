import { IsNotEmpty } from 'class-validator';

export class CreateDatasourceDto {
  @IsNotEmpty()
  id: number

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  url: string
}
 
