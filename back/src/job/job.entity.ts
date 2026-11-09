import { RegisterEntity } from 'src/register/register.entity';
import { UserEntity } from 'src/user/user.entity';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany} from 'typeorm';

@Entity('jobs')
export class JobEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @OneToMany(() => RegisterEntity, (register) => register.job)
  registers: RegisterEntity[];

  @ManyToMany(() => UserEntity, (user) => user.jobs)
  users: UserEntity[];
}

