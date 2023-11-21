import { Module } from '@nestjs/common';
import { IntegrationProfileController } from './controllers/api-configuration.controller';
import { IntegrationProfileService } from './services/api-configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationProfile } from 'src/shared/entities/api-configuration.entity';
import { BullModule } from '@nestjs/bullmq';
import { IntegrationProfileConsumer } from './consumers/api-configuration.consumer';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [],
  controllers: [IntegrationProfileController],
  providers: [IntegrationProfileService, IntegrationProfileConsumer],
})
export class IntegrationProfileModule {}
