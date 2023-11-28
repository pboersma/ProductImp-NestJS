import { Module } from '@nestjs/common';

// NestJS Modules
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { BullModule } from '@nestjs/bull';

// Project Modules
import IntegrationProfilesModule from './modules/integration-profiles/integration-profiles.module';

// TypeORM Entities
import IntegrationProfilesEntity from './modules/integration-profiles/integration-profiles.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [IntegrationProfilesEntity],
      synchronize: true,
    }),
    // REST API Modules
    IntegrationProfilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
