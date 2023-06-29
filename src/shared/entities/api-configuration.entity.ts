import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class APIConfiguration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;
}
