import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
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
  getAllProducts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('query', new DefaultValuePipe(''), ValidationPipe) query: string,
  ): Promise<APIProductInterface[]> {
    return this.productService.findAll(page, limit, query);
  }

  // @Post()
  // @UsePipes(ValidationPipe)
  // async createAPIProduct(
  //   @Body() createDto: CreateAPIProductDto,
  // ): Promise<APIProductInterface> {
  //   return this.productService.create(createDto);
  // }
}
// @Post()
// @UsePipes(ValidationPipe)
// async createAPIProduct(
//   @Body() createDto: CreateAPIProductDto,
// ): Promise<APIProductInterface> {
//   return this.productService.create(createDto);
// }
