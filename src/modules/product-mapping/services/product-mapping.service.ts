import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductMapping } from 'src/shared/entities/product-mapping.entity';
import { InsertResult, Repository, UpdateResult, DeleteResult } from 'typeorm';
import { CreateProductMappingDto } from '../dtos/create-product-mapping.dto';
import { ProductMappingInterface } from 'src/shared/interfaces/product-mapping.interface';
import { UpdateProductMappingDto } from '../dtos/update-product-mapping.dto';

@Injectable()
export class ProductMappingService {
  constructor(
    @InjectRepository(ProductMapping)
    private productMappingRepository: Repository<ProductMappingInterface>,
  ) {}

  async findAll(): Promise<any> {
    return this.productMappingRepository.find();
  }

  async find(id: number, columns: any = ['name', 'url']): Promise<any> {
    return this.productMappingRepository.findOne({
      select: columns,
      where: {
        id,
      },
    });
  }

  async create(createDto: CreateProductMappingDto): Promise<InsertResult> {
    try {
      return await this.productMappingRepository.insert(createDto);
    } catch (e) {
      throw e;
    }
  }

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

  async delete(id: number): Promise<DeleteResult> {
    return this.productMappingRepository.delete(id);
  }
}
