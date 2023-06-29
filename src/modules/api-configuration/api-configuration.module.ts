import { Module } from '@nestjs/common';
import { APIConfigurationController } from './controllers/api-configuration.controller';
import { APIConfigurationService } from './services/api-configuration.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APIConfiguration } from 'src/shared/entities/api-configuration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([APIConfiguration])],
  controllers: [APIConfigurationController],
  providers: [APIConfigurationService],
})
export class APIConfigurationModule {}
