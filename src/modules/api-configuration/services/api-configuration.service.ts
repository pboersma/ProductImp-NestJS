import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { APIConfigurationInterface } from 'src/shared/interfaces/api-configuration.interface';
import { CreateAPIConfigurationDto } from '../dtos/create-api-configuration.dto';
import { APIConfiguration } from 'src/shared/entities/api-configuration.entity';

@Injectable()
export class APIConfigurationService {
  constructor(
    @InjectRepository(APIConfiguration)
    private apiConfigurationRepository: Repository<APIConfiguration>,
  ) {}

  findAll(): Promise<APIConfigurationInterface[]> {
    return this.apiConfigurationRepository.find();
  }

  async find(
    id: number,
    columns: any = ['name', 'url', 'authentication'],
  ): Promise<any> {
    return this.apiConfigurationRepository.findOne({
      select: columns,
      where: {
        id,
      },
    });
  }

  async create(
    createDto: CreateAPIConfigurationDto,
  ): Promise<APIConfigurationInterface> {
    try {
      return this.apiConfigurationRepository.save(createDto);
    } catch (e) {
      console.error(e);
    }
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.apiConfigurationRepository.delete(id);
  }
}
