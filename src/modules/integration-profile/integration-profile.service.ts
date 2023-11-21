import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { IntegrationProfileInterface } from 'src/shared/interfaces/api-configuration.interface';
import { CreateIntegrationProfileDto } from '../dtos/create-api-configuration.dto';
import { IntegrationProfile } from 'src/shared/entities/api-configuration.entity';

@Injectable()
export class IntegrationProfileService {
  constructor(
    @InjectRepository(IntegrationProfile)
    private apiConfigurationRepository: Repository<IntegrationProfile>,
  ) {}

  /**
   * Gets all the available API Configurions.
   *
   * @returns { Promise<IntegrationProfileInterface[]> }
   */
  findAll(): Promise<IntegrationProfileInterface[]> {
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
   * @returns { Promise<IntegrationProfile> } The found API configuration.
   */
  async find(
    id: number,
    columns: any = ['name', 'url'],
  ): Promise<IntegrationProfile> {
    return this.apiConfigurationRepository.findOne({
      select: columns,
      where: {
        id,
      },
    });
  }

  /**
   * Create a new API configuration.
   *
   * @param { CreateIntegrationProfileDto } createDto - The data for creating the API configuration.
   *
   * @returns { Promise<IntegrationProfileInterface> } The created API configuration.
   */
  async create(
    createDto: CreateIntegrationProfileDto,
  ): Promise<IntegrationProfileInterface> {
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
   * @param { Partial<IntegrationProfile> } updateData - The partial data for updating the API configuration.
   *
   * @returns { Promise<IntegrationProfile> } The updated API configuration.
   */
  async update(
    id: number,
    updateData: Partial<IntegrationProfile>,
  ): Promise<IntegrationProfile> {
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
