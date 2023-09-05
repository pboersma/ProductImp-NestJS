import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Index,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { APIConfiguration } from './api-configuration.entity';
import { ProductMapping } from './product-mapping.entity';

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

  @OneToOne(() => ProductMapping, (ProductMapping) => ProductMapping.product)
  @JoinColumn()
  mapping: ProductMapping;

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
