import { Injectable } from '@nestjs/common';
import IntegrationProfilesRepository from 'src/repositories/integration-profiles.repository';

@Injectable()
export default class IntegrationProfilesService extends IntegrationProfilesRepository {}
