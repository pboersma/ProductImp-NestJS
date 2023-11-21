import { Module } from '@nestjs/common';

// NestJS Modules
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';

// Project Modules
import { IntegrationProfileModule } from './modules/integration-profile/integration-profile.module';
// import { APIProductModule } from './modules/api-product/api-product.module';
// import { APIConfigurationModule } from './modules/api-configuration/api-configuration.module';
// import { ProductMappingModule } from './modules/product-mapping/product-mapping.module';
// import { ProductWoocommerceModule } from './modules/product-woocommerce/product-woocommerce.module';

// TypeORM Entities
// import { APIConfiguration } from './shared/entities/api-configuration.entity';
// import { APIProduct } from './shared/entities/api-product.entity';
// import { ProductMapping } from './shared/entities/product-mapping.entity';
// import { ProductWoocommerce } from './shared/entities/product-woocommerce.entity';

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
      entities: [
        APIConfiguration,
        APIProduct,
        ProductMapping,
        ProductWoocommerce,
      ],
      synchronize: true,
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
      },
    }),
    IntegrationProfileModule,
    // Rest API Modules
    // APIConfigurationModule,
    // APIProductModule,
    // ProductMappingModule,
    // ProductWoocommerceModule,
  ],
})
export class AppModule {}
