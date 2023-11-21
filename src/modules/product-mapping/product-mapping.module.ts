import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductMapping } from 'src/shared/entities/product-mapping.entity';
import { ProductMappingController } from './controllers/product-mapping.controller';
import { ProductMappingService } from './services/product-mapping.service';
import { APIProduct } from 'src/shared/entities/api-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductMapping, APIProduct])],
  controllers: [ProductMappingController],
  providers: [ProductMappingService],
})
export class ProductMappingModule {}
