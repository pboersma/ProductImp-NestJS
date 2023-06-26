import { Controller, Get, Post, Body } from '@nestjs/common';
import { DatasourceService } from '../services/datasource.service';
import { Datasource } from '../../../shared/interfaces/datasource.interface'
import { ApiTags } from '@nestjs/swagger';
import { CreateDatasourceDto } from '../dtos/create-datasource.dto';

@ApiTags('datasources')
@Controller('datasources')
export class DatasourceController {
  constructor(private readonly datasourceService: DatasourceService) {}

  @Get()
  getAllDatasources(): Datasource[] {
    return this.datasourceService.getAllDatasources();
  }

  @Post()
  createDatasource(@Body() createDto: CreateDatasourceDto): Datasource {
    return this.datasourceService.createDatasource(createDto)
  }
}
