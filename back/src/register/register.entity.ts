import { JobEntity } from 'src/job/job.entity';
import { UserEntity } from 'src/user/user.entity';
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';

@Entity('register')
export class RegisterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column('date')
  job_date: Date;

  @OneToMany(() => UserEntity, (user) => user.register)
  users: UserEntity[];

  @ManyToOne(() => JobEntity, (job) => job.registers, {  onDelete: 'RESTRICT'})
  job: JobEntity;

}

