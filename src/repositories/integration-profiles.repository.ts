import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import IntegrationProfilesEntity from 'src/modules/integration-profiles/integration-profiles.entity';
import BaseRepository from './base.repository';

export default class IntegrationProfilesRepository extends BaseRepository {
  constructor(
    @InjectRepository(IntegrationProfilesEntity)
    private integrationProfilesRepository: Repository<IntegrationProfilesEntity>,
  ) {
    super(integrationProfilesRepository);
  }
}
