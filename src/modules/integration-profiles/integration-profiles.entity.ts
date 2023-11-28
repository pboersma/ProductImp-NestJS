import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { APIProduct } from './api-product.entity';

@Entity('integration-profiles')
export default class IntegrationProfilesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  // @Column({ nullable: true })
  // authentication: string;

  // @Column({ default: false })
  // autoSync: boolean;

  // @OneToMany(() => APIProduct, (product) => product.configuration)
  // products: APIProduct[];

  // @CreateDateColumn()
  // createdDate: Date;

  // @UpdateDateColumn()
  // updatedDate: Date;

  // @DeleteDateColumn()
  // deletedDate: Date;

  // @Column({ type: 'timestamp', nullable: true })
  // syncDate: Date;
}
