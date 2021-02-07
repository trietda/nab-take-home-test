import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export default class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  price!: number;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  color?: string;
}
