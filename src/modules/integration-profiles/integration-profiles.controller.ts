import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import BaseControllerInterface from 'src/interfaces/base-controller.interface';
import IntegrationProfilesService from './integration-profiles.service';
import CreateIntegrationProfileDTO from './dto/create-integration-profile.dto';
import { ObjectLiteral } from 'typeorm';
import UpdateIntegrationProfileDTO from './dto/update-integration-profile.dto';
import { HTTP_ERRORS } from 'src/constants/errors.constants';

@ApiTags('integration-profiles')
@Controller('integration-profiles')
export default class IntegrationProfiles implements BaseControllerInterface {
  constructor(
    private readonly integrationProfilesService: IntegrationProfilesService,
  ) {}

  /**
   * @inheritDoc
   */
  @Post()
  @UsePipes(ValidationPipe)
  async createResource(
    @Body() integrationProfileDto: CreateIntegrationProfileDTO,
  ): Promise<ObjectLiteral> {
    return await this.integrationProfilesService.create(integrationProfileDto);
  }

  /**
   * @inheritDoc
   */
  @Get()
  async listResources(): Promise<ObjectLiteral> {
    return await this.integrationProfilesService.findAll();
  }

  /**
   * @inheritDoc
   */
  @Get(':identifier')
  async getResourceById(
    @Param('identifier') identifier: number,
  ): Promise<ObjectLiteral> {
    const resource = await this.integrationProfilesService.findSpecific(
      identifier,
    );

    if (!resource) {
      throw new NotFoundException(HTTP_ERRORS.NOT_FOUND);
    }

    return resource;
  }

  /**
   * @inheritDoc
   */
  @Put(':identifier')
  @UsePipes(ValidationPipe)
  async updateResource(
    @Param('identifier') identifier: number,
    @Body() integrationProfileDto: UpdateIntegrationProfileDTO,
  ): Promise<ObjectLiteral> {
    const resource = await this.integrationProfilesService.update(
      identifier,
      integrationProfileDto,
    );

    if (!resource) {
      throw new NotFoundException(HTTP_ERRORS.NOT_FOUND);
    }

    return resource;
  }

  /**
   * @inheritDoc
   */
  @Delete(':identifier')
  async deleteResource(
    @Param('identifier') identifier: number,
  ): Promise<ObjectLiteral> {
    const resource = await this.integrationProfilesService.delete(identifier);

    if (!resource) {
      throw new NotFoundException(HTTP_ERRORS.NOT_FOUND);
    }

    return resource;
  }
}
