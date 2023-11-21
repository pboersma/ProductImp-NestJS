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
import { ProductMappingService } from '../services/product-mapping.service';

// DTO
import { CreateProductMappingDto } from '../dtos/create-product-mapping.dto';

// Interfaces
import { ProductMappingInterface } from 'src/shared/interfaces/product-mapping.interface';

@ApiTags('product-mapping')
@Controller('product-mapping')
export class ProductMappingController {
  constructor(private readonly productMappingService: ProductMappingService) {}

  /**
   * Get all product mappings.
   *
   * @returns { Promise<ProductMappingInterface[]> } A promise that resolves to an array of `ProductMappingInterface` representing all product mappings.
   */
  @Get()
  async getAllProductMappings(): Promise<ProductMappingInterface[]> {
    return this.productMappingService.findAll();
  }

  /**
   * Create or update a product mapping.
   *
   * @param { CreateProductMappingDto } createDto - The DTO containing data for creating or updating a product mapping.
   *
   * @returns { Promise<InsertResult> } The result of the createOrUpdate operation, which may include information about the affected rows.
   */
  @Post()
  @UsePipes(ValidationPipe)
  async createProductMapping(
    @Body() createDto: CreateProductMappingDto,
  ): Promise<InsertResult> {
    return this.productMappingService.createOrUpdate(createDto);
  }

  /**
   * Delete a product mapping by its ID.
   *
   * @param { number } id - The ID of the product mapping to delete.
   *
   * @returns { Promise<DeleteResult> } A promise that resolves to a `DeleteResult` object representing the result of the delete operation, which may include information about the affected rows.
   */
  @Delete(':id')
  async deleteProductMapping(@Param('id') id: number): Promise<DeleteResult> {
    return this.productMappingService.delete(id);
  }
}
