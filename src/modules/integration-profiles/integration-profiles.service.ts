import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectLiteral, Repository } from 'typeorm';
import BaseServiceInterface from 'src/interfaces/base-service.interface';
import IntegrationProfilesEntity from './integration-profiles.entity';
import CreateIntegrationProfileDTO from './dto/create-integration-profile.dto';
import UpdateIntegrationProfileDTO from './dto/update-integration-profile.dto';

@Injectable()
/**
 * Service for managing Integration Profiles.
 */
export default class IntegrationProfilesService
  implements BaseServiceInterface
{
  /**
   * Constructor for IntegrationProfilesService.
   * @param integrationProfilesRepository - The repository for IntegrationProfilesEntity.
   */
  constructor(
    @InjectRepository(IntegrationProfilesEntity)
    private integrationProfilesRepository: Repository<IntegrationProfilesEntity>,
  ) {}

  /**
   * @inheritDoc
   */
  async findAll(): Promise<ObjectLiteral[]> {
    return await this.integrationProfilesRepository.find();
  }

  /**
   * @inheritDoc
   */
  async findSpecific(identifier: number): Promise<ObjectLiteral> {
    return await this.integrationProfilesRepository.findOne({
      select: {
        name: true,
        url: true,
      },
      where: {
        id: identifier,
      },
    });
  }

  /**
   * @inheritDoc
   */
  async create(payload: CreateIntegrationProfileDTO): Promise<ObjectLiteral> {
    const resource = this.integrationProfilesRepository.create(payload);

    return await this.integrationProfilesRepository.save(resource);
  }

  /**
   * @inheritDoc
   */
  async update(
    identifier: number,
    payload: UpdateIntegrationProfileDTO,
  ): Promise<ObjectLiteral> {
    const resource = await this.integrationProfilesRepository.findOne({
      where: {
        id: identifier,
      },
    });

    // Return if the resource is null.
    if (!resource) {
      return resource;
    }

    return await this.integrationProfilesRepository.save(
      this.integrationProfilesRepository.merge(resource, payload),
    );
  }

  /**
   * @inheritDoc
   */
  async delete(identifier: number): Promise<ObjectLiteral> {
    const resource = await this.integrationProfilesRepository.findOne({
      where: {
        id: identifier,
      },
    });

    // Return if the resource is null.
    if (!resource) {
      return resource;
    }

    return await this.integrationProfilesRepository.delete(resource);
  }
}
