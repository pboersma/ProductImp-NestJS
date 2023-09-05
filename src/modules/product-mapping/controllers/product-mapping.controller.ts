import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Body,
  Patch,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InsertResult, UpdateResult, DeleteResult } from 'typeorm';
import { ProductMappingService } from '../services/product-mapping.service';

// DTO
import { CreateProductMappingDto } from '../dtos/create-product-mapping.dto';
import { UpdateProductMappingDto } from '../dtos/update-product-mapping.dto';

@ApiTags('product-mapping')
@Controller('product-mapping')
export class ProductMappingController {
  constructor(private readonly productMappingService: ProductMappingService) {}

  @Get()
  async getAllProductMappings(): Promise<any> {
    return this.productMappingService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createProductMapping(
    @Body() createDto: CreateProductMappingDto,
  ): Promise<InsertResult> {
    return this.productMappingService.create(createDto);
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updateProductMapping(
    @Body() updateDto: UpdateProductMappingDto,
  ): Promise<UpdateResult> {
    return this.productMappingService.update(updateDto);
  }

  @Delete(':id')
  async deleteProductMapping(@Param('id') id: number): Promise<DeleteResult> {
    return this.productMappingService.delete(id);
  }
}
