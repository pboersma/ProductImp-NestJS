import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { APIConfigurationService } from '../services/api-configuration.service';
import { APIConfigurationInterface } from '../../shared/interfaces/api-configuration.interface';
import { ApiTags } from '@nestjs/swagger';
import { CreateAPIConfigurationDto } from '../dtos/create-api-configuration.dto';
import { UpdateAPIConfigurationDto } from '../dtos/update-api-configuration.dto';
import { DeleteResult } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@ApiTags('api-configurations')
@Controller('api-configurations')
export class APIConfigurationController {
  constructor(
    private readonly configurationService: APIConfigurationService,
    @InjectQueue('api-configuration')
    private readonly apiConfigurationQueu: Queue,
  ) {}

  @Get()
  /**
   * Get a specific API Configuration through the configuration service
   *
   * @return { Promise<APIConfigurationInterface[]> }
   */
  async getAllAPIConfigurations(): Promise<any> {
    return this.configurationService.findAll();
  }

  @Get(':id')
  /**
   * Get a specific API Configuration through the configuration service
   *
   * @return { Promise<APIConfigurationInterface[]> }
   */
  async getSpecificAPIConfiguration(@Param('id') id: number): Promise<any> {
    return this.configurationService.find(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  /**
   * Create a new API Configuration using the Configuration service.
   *
   * @param { CreateAPIConfigurationDto } createDto - The data for creating the API configuration.
   *
   * @returns { Promise<APIConfigurationInterface> } The created API configuration.
   */
  async createAPIConfiguration(
    @Body() createDto: CreateAPIConfigurationDto,
  ): Promise<APIConfigurationInterface> {
    return this.configurationService.create(createDto);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  /**
   * Update an existing API configuration by ID.
   *
   * @param { number } id - The ID of the API configuration to update.
   * @param { UpdateAPIConfigurationDto } updateDto - The data for updating the API configuration.
   *
   * @returns { Promise<APIConfigurationInterface> } The updated API configuration.
   */
  async updateAPIConfiguration(
    @Param('id') id: number,
    @Body() updateDto: UpdateAPIConfigurationDto,
  ): Promise<APIConfigurationInterface> {
    return this.configurationService.update(id, updateDto);
  }

  /**
   * Delete an API configuration by ID.
   *
   * @param { number } id - The ID of the API configuration to delete.
   *
   * @returns { Promise<DeleteResult> } The result of the delete operation.
   */
  @Delete(':id')
  async deleteAPIConfiguration(@Param('id') id: number): Promise<DeleteResult> {
    return this.configurationService.delete(id);
  }

  /**
   * Synchronize an API configuration by its ID.
   *
   * @param { number } id - The ID of the API configuration to synchronize.
   *
   * @returns { Promise<any> } A response object indicating the success of the synchronization.
   */
  @Post('sync/:id')
  async synchronizeAPIConfiguration(@Param('id') id: number): Promise<any> {
    await this.apiConfigurationQueu.add('api-configuration-sync', { id: id });

    return {
      message: 'OK',
    };
  }
}
