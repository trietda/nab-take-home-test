import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_activity')
export default class UserActivityEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('varchar')
  userName!: string;

  @Column('varchar')
  action!: string;

  @Column('varchar')
  objectType!: string;

  @Column('varchar', { nullable: true })
  objectId?: string | null;

  @Column('json')
  metadata?: Record<'string', any>;
}
