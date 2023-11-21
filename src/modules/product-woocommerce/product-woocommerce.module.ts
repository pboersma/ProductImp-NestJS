import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductWoocommerce } from 'src/shared/entities/product-woocommerce.entity';
import { ProductWoocommerceController } from './controllers/product-woocommerce.controller';
import { ProductWoocommerceService } from './services/product-woocommerce.service';
import { APIProduct } from 'src/shared/entities/api-product.entity';
import { ProductMapping } from 'src/shared/entities/product-mapping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductWoocommerce, APIProduct, ProductMapping]),
  ],
  controllers: [ProductWoocommerceController],
  providers: [ProductWoocommerceService],
})
export class ProductWoocommerceModule {}
