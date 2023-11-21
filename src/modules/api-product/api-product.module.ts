import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { APIProduct } from 'src/shared/entities/api-product.entity';
import { APIProductController } from './controllers/api-product.controller';
import { APIProductService } from './services/api-product.service';
import { APIConfigurationService } from '../api-configuration/services/api-configuration.service';
import { APIConfiguration } from 'src/shared/entities/api-configuration.entity';
import { BullModule } from '@nestjs/bullmq';
import { APIProductConsumer } from './consumers/api-products.consumer';

@Module({
  imports: [
    TypeOrmModule.forFeature([APIProduct, APIConfiguration]),
    HttpModule,
    BullModule.registerQueue({
      name: 'api-products',
    }),
  ],
  controllers: [APIProductController],
  providers: [APIProductService, APIConfigurationService, APIProductConsumer],
})
export class APIProductModule {}
