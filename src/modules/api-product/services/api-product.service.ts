import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Like, Repository } from 'typeorm';
import { APIProductInterface } from 'src/shared/interfaces/api-product.interface';
import { CreateAPIProductDto } from '../dtos/create-api-product.dto';
import { APIProduct } from 'src/shared/entities/api-product.entity';
import { APIConfigurationService } from 'src/modules/api-configuration/services/api-configuration.service';
import { ERRORS } from 'src/shared/constants/errors.constants';
import { APIConfiguration } from 'src/shared/entities/api-configuration.entity';

@Injectable()
export class APIProductService {
  constructor(
    @InjectRepository(APIProduct)
    private apiProductRepository: Repository<APIProduct>,
    @InjectRepository(APIConfiguration)
    private apiConfigurationRepository: Repository<APIConfiguration>,
  ) {}

  async findAll(page = 1, limit = 10, query = ''): Promise<any> {
    const [items, total] = await this.apiProductRepository.findAndCount({
      where: {
        name: Like(`%${query}%`),
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      items,
      total,
    };
  }

  /**
   * Create a new product inside the api_product table
   *
   * @param {CreateAPIProductDto} createDto
   *
   * @returns {Promise<APIProductInterface>}
   */
  async createBulk(createDto: any): Promise<any> {
    try {
      // TODO: Replace with Service instead of Repository.
      const configuration = await this.apiConfigurationRepository.findOne({
        select: ['id', 'name', 'url'],
        where: {
          id: createDto.configuration,
        },
      });

      if (!configuration) {
        throw new Error(ERRORS.UNKNOWN_API_CONFIGURATION);
      }

      const productsToInsert: APIProduct[] = createDto;

      try {
        // Insert all the products,
        return await this.apiProductRepository
          .createQueryBuilder()
          .insert()
          .into(APIProduct)
          .values(productsToInsert)
          .execute();
      } catch (e) {
        // Update
        productsToInsert.forEach(async (element) => {
          await this.apiProductRepository
            .createQueryBuilder()
            .update(APIProduct)
            .set(element)
            .where('uid = :uid', { uid: element.uid })
            .execute();
        });
      }
    } catch (e) {
      console.error(e);
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.apiProductRepository.delete(id);
  }
}
