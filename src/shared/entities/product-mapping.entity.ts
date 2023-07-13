import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { APIProduct } from './api-product.entity';

@Entity()
export class ProductMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => APIProduct)
  @JoinColumn()
  product: APIProduct;

  @Column({ type: 'json' })
  map: Record<string, any>;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
