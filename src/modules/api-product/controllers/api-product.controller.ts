import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { APIProductInterface } from 'src/shared/interfaces/api-product.interface';
import { APIProductService } from '../services/api-product.service';

@ApiTags('api-products')
@Controller('api-products')
export class APIProductController {
  constructor(private readonly productService: APIProductService) {}

  @Get()
  /**
   * Get all API Configuration objects
   *
   * @return {Promise<APIProductInterface[]>}
   */
  getAllProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('query', new DefaultValuePipe(''), ValidationPipe) query: string,
  ): Promise<APIProductInterface[]> {
    return this.productService.findAll(page, limit, query);
  }
}
