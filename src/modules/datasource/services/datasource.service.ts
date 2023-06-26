import { Injectable } from '@nestjs/common';
import { Datasource } from 'src/shared/interfaces/datasource.interface';
import { CreateDatasourceDto } from '../dtos/create-datasource.dto';

@Injectable()
export class DatasourceService {
  getAllDatasources(): Datasource[] {
    return [
      {
        id: 123,
        name: "test",
        url: "test"
      }
    ];
  }

  createDatasource(createDto: CreateDatasourceDto): Datasource {
    return createDto
  }
}
