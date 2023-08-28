import { Injectable, NotFoundException } from '@nestjs/common';
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

  /**
   * Gets all the available API Configurions.
   *
   * @returns { Promise<APIConfigurationInterface[]> }
   */
  findAll(): Promise<APIConfigurationInterface[]> {
    return this.apiConfigurationRepository.find({
      select: {
        id: true,
        name: true,
        url: true,
        autoSync: true,
        updatedDate: true,
        syncDate: true,
      },
    });
  }

  /**
   * Find an API configuration by ID.
   *
   * @param { number } id - The ID of the API configuration to find.
   *
   * @returns { Promise<APIConfiguration> } The found API configuration.
   */
  async find(id: number): Promise<APIConfiguration> {
    return this.apiConfigurationRepository.findOne({
      select: ['name', 'url'],
      where: {
        id,
      },
    });
  }

  /**
   * Create a new API configuration.
   *
   * @param { CreateAPIConfigurationDto } createDto - The data for creating the API configuration.
   *
   * @returns { Promise<APIConfigurationInterface> } The created API configuration.
   */
  async create(
    createDto: CreateAPIConfigurationDto,
  ): Promise<APIConfigurationInterface> {
    try {
      return this.apiConfigurationRepository.save(createDto);
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * Update an existing API configuration by ID.
   *
   * @param { number } id - The ID of the API configuration to update.
   * @param { Partial<APIConfiguration> } updateData - The partial data for updating the API configuration.
   *
   * @returns { Promise<APIConfiguration> } The updated API configuration.
   */
  async update(
    id: number,
    updateData: Partial<APIConfiguration>,
  ): Promise<APIConfiguration> {
    const entityToUpdate = await this.apiConfigurationRepository.findOne({
      select: ['id', 'name', 'url'],
      where: {
        id,
      },
    });

    if (!entityToUpdate) {
      // Handle error if the entity doesn't exist
      throw new NotFoundException(`Entity with ID ${id} not found`);
    }

    // Apply the updates to the entity
    Object.assign(entityToUpdate, updateData);

    return await this.apiConfigurationRepository.save(entityToUpdate);
  }

  /**
   * Delete an API configuration by ID.
   *
   * @param { number } id - The ID of the API configuration to delete.
   *
   * @returns { Promise<DeleteResult> } The result of the delete operation.
   */
  async delete(id: number): Promise<DeleteResult> {
    return this.apiConfigurationRepository.delete(id);
  }
}
