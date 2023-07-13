import { Module } from '@nestjs/common';
import { APIConfigurationController } from './controllers/api-configuration.controller';
import { APIConfigurationService } from './services/api-configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APIConfiguration } from 'src/shared/entities/api-configuration.entity';
import { BullModule } from '@nestjs/bull';
import { APIConfigurationConsumer } from './consumers/api-configuration.consumer';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([APIConfiguration]),
    HttpModule,
    BullModule.registerQueue({
      name: 'api-configuration',
    }),
    BullModule.registerQueue({
      name: 'api-products',
    }),
  ],
  controllers: [APIConfigurationController],
  providers: [APIConfigurationService, APIConfigurationConsumer],
})
export class APIConfigurationModule {}
