import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { APIConfiguration } from './api-configuration.entity';

@Entity()
export class APIProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => APIConfiguration,
    (configuration) => configuration.products,
    { nullable: false, onDelete: 'CASCADE' },
  )
  configuration: APIConfiguration;

  @Column()
  @Index({ unique: true })
  uid: string;

  @Column()
  name: string;

  @Column({ type: 'json' })
  product: Record<string, any>;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
