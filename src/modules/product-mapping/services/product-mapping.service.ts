import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductMapping } from 'src/shared/entities/product-mapping.entity';
import { Repository, DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ProductMappingInterface } from 'src/shared/interfaces/product-mapping.interface';
import { APIProduct } from 'src/shared/entities/api-product.entity';
import { ERRORS } from 'src/shared/constants/errors.constants';

@Injectable()
export class ProductMappingService {
  constructor(
    @InjectRepository(ProductMapping)
    private productMappingRepository: Repository<ProductMappingInterface>,
    @InjectRepository(APIProduct)
    private apiProductRepository: Repository<APIProduct>,
  ) {}

  async findAll(): Promise<ProductMappingInterface[]> {
    return this.productMappingRepository.find();
  }

  async createOrUpdate(map: ProductMappingInterface): Promise<any> {
    try {
      const mapping = await this.productMappingRepository.save(map);
      await this.linkMappingToProduct(mapping);

      return mapping;
    } catch (error) {
      throw new Error(ERRORS.GENERIC_ERROR);
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.productMappingRepository.delete(id);
  }

  private async linkMappingToProduct(
    mapping: ProductMappingInterface,
  ): Promise<void> {
    try {
      await this.apiProductRepository.update(
        { id: mapping.product },
        { mapping: mapping.id },
      );
    } catch (error) {
      throw new Error(ERRORS.LINK_MAP_TO_PRODUCT);
    }
  }
}
