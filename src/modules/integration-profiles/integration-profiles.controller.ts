import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectLiteral } from 'typeorm';
import ControllerInterface from 'src/interfaces/controller.interface';
import CreateIntegrationProfileDTO from 'src/dto/integration-profiles/create-integration-profile.dto';
import UpdateIntegrationProfileDTO from 'src/dto/integration-profiles/update-integration-profile.dto';
import IntegrationProfilesService from './integration-profiles.service';

@ApiTags('integration-profiles')
@Controller('integration-profiles')
export default class IntegrationProfiles implements ControllerInterface {
  constructor(
    private readonly integrationProfilesService: IntegrationProfilesService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createResource(
    @Body() integrationProfileDto: CreateIntegrationProfileDTO,
  ): Promise<ObjectLiteral> {
    return await this.integrationProfilesService.create(integrationProfileDto);
  }

  @Get()
  async listResources(): Promise<ObjectLiteral> {
    return await this.integrationProfilesService.findAll();
  }

  @Get(':identifier')
  async getResourceById(
    @Param('identifier') identifier: number,
  ): Promise<ObjectLiteral> {
    return await this.integrationProfilesService.findSpecific(
      {
        name: true,
        url: true,
      },
      identifier,
    );
  }

  @Put(':identifier')
  @UsePipes(ValidationPipe)
  async updateResource(
    @Param('identifier') identifier: number,
    @Body() integrationProfileDto: UpdateIntegrationProfileDTO,
  ): Promise<ObjectLiteral> {
    return await this.integrationProfilesService.update(
      identifier,
      integrationProfileDto,
    );
  }

  @Delete(':identifier')
  async deleteResource(
    @Param('identifier') identifier: number,
  ): Promise<ObjectLiteral> {
    return await this.integrationProfilesService.delete(identifier);
  }
}
