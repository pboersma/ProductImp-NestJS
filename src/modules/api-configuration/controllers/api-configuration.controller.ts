import { Controller, Get, Post, Body, Delete, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { APIConfigurationService } from '../services/api-configuration.service';
import { APIConfigurationInterface } from '../../../shared/interfaces/api-configuration.interface';
import { ApiTags } from '@nestjs/swagger';
import { CreateAPIConfigurationDto } from '../dtos/create-api-configuration.dto';
import { DeleteResult } from 'typeorm';
import { InjectQueue } from '@nestjs/bull';
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
   * Get all API Configuration objects
   *
   * @return {Promise<APIConfigurationInterface[]>}
   */
  getAllAPIConfigurations(): Promise<APIConfigurationInterface[]> {
    return this.configurationService.findAll();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createAPIConfiguration(
    @Body() createDto: CreateAPIConfigurationDto,
  ): Promise<APIConfigurationInterface> {
    return this.configurationService.create(createDto);
  }

  // @Put(':id')
  // async updateAPIConfiguration(@Param() payload: any): Promise<any> {
  //   return this.configurationService.update(payload);
  // }

  @Delete(':id')
  async deleteAPIConfiguration(@Param('id') id: number): Promise<DeleteResult> {
    return this.configurationService.delete(id);
  }

  @Post('sync/:id')
  async synchronizeAPIConfiguration(@Param('id') id: number): Promise<any> {
    // Pass the APIConfiguration Instance to
    await this.apiConfigurationQueu.add('api-configuration-sync', { id: id });

    return {
      message: 'OK',
    };
  }
}
