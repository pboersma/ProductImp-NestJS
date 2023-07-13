import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductMapping } from 'src/shared/entities/product-mapping.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductMappingService {
  constructor(
    @InjectRepository(ProductMapping)
    private productMappingRepository: Repository<ProductMapping>,
  ) {}

  async create(createDto: any): Promise<any> {
    try {
      return await this.productMappingRepository.save(createDto);
    } catch (e) {
      throw e;
    }
  }
}
