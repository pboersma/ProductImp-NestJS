import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InsertResult, DeleteResult } from 'typeorm';
import { ProductWoocommerceService } from '../services/product-woocommerce.service';

// DTO
import { CreateProductWoocommerceDto } from '../dtos/create-product-woocommerce.dto';

// Interfaces
// import { ProductWoocommerceInterface } from 'src/shared/interfaces/product-woocommerce.interface';

@ApiTags('product-woocommerce')
@Controller('product-woocommerce')
export class ProductWoocommerceController {
  constructor(
    private readonly productWoocommerceService: ProductWoocommerceService,
  ) {}

  // @Get()
  // async getAllProductWoocommerces(): Promise<ProductWoocommerceInterface[]> {
  //   return this.productWoocommerceService.findAll();
  // }

  @Post()
  @UsePipes(ValidationPipe)
  async createProductWoocommerce(
    @Body() createDto: CreateProductWoocommerceDto,
  ): Promise<any> {
    return this.productWoocommerceService.createOrUpdate(createDto);
  }

  // @Delete(':id')
  // async deleteProductWoocommerce(@Param('id') id: number): Promise<DeleteResult> {
  //   return this.productWoocommerceService.delete(id);
  // }
}
