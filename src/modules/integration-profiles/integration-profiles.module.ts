import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import IntegrationProfilesEntity from 'src/entities/integration-profiles.entity';
import IntegrationProfilesController from './integration-profiles.controller';
import IntegrationProfilesService from './integration-profiles.service';

@Module({
  imports: [TypeOrmModule.forFeature([IntegrationProfilesEntity]), HttpModule],
  controllers: [IntegrationProfilesController],
  providers: [IntegrationProfilesService],
})
export default class IntegrationProfilesModule {}
