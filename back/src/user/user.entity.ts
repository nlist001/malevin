import { JobEntity } from 'src/job/job.entity';
import { RegisterEntity } from 'src/register/register.entity';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column('text')
  fio: string;

  @ManyToOne(() => RegisterEntity, (register) => register.users, {  onDelete: 'SET NULL'})
  register: RegisterEntity | null;

  @ManyToMany(() => JobEntity, (job) => job.users, {  onDelete: 'RESTRICT'})
  @JoinTable()
  jobs: JobEntity[];

}

