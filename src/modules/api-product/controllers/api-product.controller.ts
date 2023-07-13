import { Controller, Get, Post, Body, Delete, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAPIProductDto } from '../dtos/create-api-product.dto';
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
  getAllProducts(): Promise<APIProductInterface[]> {
    return this.productService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createAPIProduct(
    @Body() createDto: CreateAPIProductDto,
  ): Promise<APIProductInterface> {
    return this.productService.create(createDto);
  }
}
