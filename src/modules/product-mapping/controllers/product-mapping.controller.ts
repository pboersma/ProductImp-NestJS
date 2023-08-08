import {
  Controller,
  Post,
  Body,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InsertResult, UpdateResult } from 'typeorm';
import { ProductMappingService } from '../services/product-mapping.service';
import { CreateProductMappingDto } from '../dtos/create-product-mapping.dto';
import { UpdateProductMappingDto } from '../dtos/update-product-mapping.dto';

@ApiTags('product-mapping')
@Controller('product-mapping')
export class ProductMappingController {
  constructor(private readonly productMappingService: ProductMappingService) {}

  /**
   * Create a new product mapping.
   *
   * @param {CreateProductMappingDto} createDto - The create data for the product mapping.
   *
   * @returns {Promise<InsertResult>} The result of the create operation.
   */
  @Post()
  @UsePipes(ValidationPipe)
  async createProductMapping(
    @Body() createDto: CreateProductMappingDto,
  ): Promise<InsertResult> {
    return this.productMappingService.create(createDto);
  }

  /**
   * Update an existing product mapping.
   *
   * @param {UpdateProductMappingDto} updateDto - The update data for the product mapping.
   *
   * @returns {Promise<UpdateResult>} The result of the update operation.
   */
  @Patch()
  @UsePipes(ValidationPipe)
  async updateProductMapping(
    @Body() updateDto: UpdateProductMappingDto,
  ): Promise<UpdateResult> {
    return this.productMappingService.update(updateDto);
  }
}
