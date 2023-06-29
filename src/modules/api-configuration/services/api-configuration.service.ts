import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { APIConfigurationInterface } from 'src/shared/interfaces/api-configuration.interface';
import { CreateAPIConfigurationDto } from '../dtos/create-api-configuration.dto';
import { APIConfiguration } from 'src/shared/entities/api-configuration.entity';

@Injectable()
export class APIConfigurationService {
  constructor(
    @InjectRepository(APIConfiguration)
    private apiConfigurationRepository: Repository<APIConfiguration>,
  ) {}

  findAll(): Promise<APIConfiguration[]> {
    return this.apiConfigurationRepository.find();
  }
}
