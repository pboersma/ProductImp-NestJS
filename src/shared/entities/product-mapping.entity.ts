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

  @Column({ type: 'json' })
  map: Record<string, any>;

  @OneToOne(() => APIProduct, (APIProduct) => APIProduct.mapping)
  product: APIProduct;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
