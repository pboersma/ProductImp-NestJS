import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IntegrationType } from 'src/types/integration-profiles.types';

@Entity('integration-profiles')
export default class IntegrationProfilesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column({
    type: 'enum',
    enum: IntegrationType,
  })
  type: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  is_synchronizable: boolean; // TODO: Change name, Is not descriptive of the actual situation.
}
