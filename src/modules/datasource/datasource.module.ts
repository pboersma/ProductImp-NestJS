import { Module } from '@nestjs/common';
import { DatasourceController } from './controllers/datasource.controller';
import { DatasourceService } from './services/datasource.service';

@Module({
  imports: [],
  controllers: [
    DatasourceController
  ],
  providers: [
    DatasourceService
  ],
})
export class DatasourceModule {}
