import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository } from 'typeorm';
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

  findAll(): Promise<APIProductInterface[]> {
    return this.apiProductRepository.find();
  }

  /**
   * Create a new product inside the api_product table
   *
   * @param {CreateAPIProductDto} createDto
   *
   * @returns {Promise<APIProductInterface>}
   */
  async create(createDto: CreateAPIProductDto): Promise<APIProductInterface> {
    try {
      // TODO: Replace with Service instead of Repository.
      const configuration = await this.apiConfigurationRepository.findOne({
        select: ['name', 'url'],
        where: {
          id: +createDto.configuration,
        },
      });

      if (!configuration) {
        throw new Error(ERRORS.UNKNOWN_API_CONFIGURATION);
      }

      return await this.apiProductRepository.save(createDto);
    } catch (e) {
      console.error(e);
    }
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
        select: ['name', 'url'],
        where: {
          id: 10,
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
