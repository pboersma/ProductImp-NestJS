import { Module } from '@nestjs/common';
import { DatasourceModule } from './modules/datasource/datasource.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DatasourceModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
