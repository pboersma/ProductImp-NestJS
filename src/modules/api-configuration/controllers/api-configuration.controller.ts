import { Controller, Get, Post, Body } from '@nestjs/common';
import { APIConfigurationService } from '../services/api-configuration.service';
import { APIConfigurationInterface } from '../../../shared/interfaces/api-configuration.interface';
import { ApiTags } from '@nestjs/swagger';
import { CreateAPIConfigurationDto } from '../dtos/create-api-configuration.dto';

@ApiTags('api-configurations')
@Controller('api-configurations')
export class APIConfigurationController {
  constructor(private readonly configurationService: APIConfigurationService) {}

  @Get()
  getAllAPIConfigurations(): Promise<APIConfigurationInterface[]> {
    return this.configurationService.findAll();
  }
}
