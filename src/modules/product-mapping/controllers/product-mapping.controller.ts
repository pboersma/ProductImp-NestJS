import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductMappingService } from '../services/product-mapping.service';

@ApiTags('product-mapping')
@Controller('product-mapping')
export class ProductMappingController {
  constructor(private readonly productMappingService: ProductMappingService) {}

  @Post()
  async createProductMapping(@Body() createDto: any): Promise<any> {
    return this.productMappingService.create(createDto);
    //   return this.productService.create(createDto);
  }
}
