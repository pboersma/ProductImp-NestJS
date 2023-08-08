import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductMapping } from 'src/shared/entities/product-mapping.entity';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateProductMappingDto } from '../dtos/create-product-mapping.dto';
import { ProductMappingInterface } from 'src/shared/interfaces/product-mapping.interface';
import { UpdateProductMappingDto } from '../dtos/update-product-mapping.dto';

@Injectable()
export class ProductMappingService {
  constructor(
    @InjectRepository(ProductMapping)
    private productMappingRepository: Repository<ProductMappingInterface>,
  ) {}

  /**
   * Create a new product mapping.
   *
   * @param {CreateProductMappingDto} createDto - The create data for the product mapping.
   *
   * @returns {Promise<InsertResult>} The result of the create operation.
   */
  async create(createDto: CreateProductMappingDto): Promise<InsertResult> {
    try {
      return await this.productMappingRepository.insert(createDto);
    } catch (e) {
      throw e;
    }
  }

  /**
   * Update an existing product mapping.
   *
   * @param {UpdateProductMappingDto} updateDto - The update data for the product mapping.
   *
   * @returns {Promise<UpdateResult>} The result of the update operation.
   */
  async update(updateDto: UpdateProductMappingDto): Promise<UpdateResult> {
    try {
      return await this.productMappingRepository.update(
        {
          product: updateDto.product,
        },
        {
          map: updateDto.map,
        },
      );
    } catch (e) {
      throw e;
    }
  }
}
