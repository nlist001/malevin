
import { BadRequestException, forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UpdateUserDTO, UserDTO } from './user.dto';
import { JobService } from 'src/job/job.service';
import { RegisterService } from 'src/register/register.service';
import { RegisterEntity } from 'src/register/register.entity';
import { JobEntity } from 'src/job/job.entity';
  
@Injectable()
export class UserService {
    private logger = new Logger(' UserService ');
  
    constructor(
        @InjectRepository(UserEntity)
        private readonly repo: Repository<UserEntity>,
        private readonly jobService: JobService,
        @Inject(forwardRef(() => RegisterService))
        private readonly registerService: RegisterService,
    ) {}
  
    async getUsers(ids?: string[]): Promise<UserEntity[]> {
        if(ids && ids?.length > 0) {
          return await this.repo.find({
            where: { id: In(ids)},
            relations: { jobs: true, register: true } 
          });
        }
        return await this.repo.find({
          relations: { jobs: true, register: true } 
        });
    }

    async getUser(id: string): Promise<UserEntity | null> {
      this.logger.verbose('getUser id: ',id)
      const j = await this.repo.findOne({
        where: { id },
        relations: { jobs: true } 
      });
      this.logger.verbose('getUser j: ',j)

      return j;
    }


    private async findDataForUser(userDTO: UserDTO): Promise<{ jobs: JobEntity[]; register: RegisterEntity | null; }> {
      const jobs = await this.jobService.getJobs(userDTO.jobsIds)
      let register: RegisterEntity | null = null;

      if(userDTO.registerId) {
        register = await this.registerService.getRegister(userDTO.registerId);
        if(register && !jobs.map(j=>j.id).includes(register.job.id)) {
          throw new BadRequestException('Навыки пользователя не соответствуют типам работ указанных в журнале')
        }
      }
      return {jobs, register}
    }
    
    async addUser(userDTO: UserDTO): Promise<UserEntity> {
      
      const {jobs, register} = await this.findDataForUser(userDTO);

      const newUser = await this.repo.create({fio:userDTO.fio, jobs, register});
      this.logger.verbose('newUser',newUser)

      return this.repo.save(newUser)
    }

    async updateUser(updateUserDTO: UpdateUserDTO): Promise<UserEntity> {
      const user = await this.repo.findOne({where: {id: updateUserDTO.id}})
      if (!user){
        throw new NotFoundException('Пользователь не найден')
      }

      const {jobs, register} = await this.findDataForUser(updateUserDTO);

      user.fio = updateUserDTO.fio;
      user.jobs = jobs;
      user.register = register;
      
      return this.repo.save(user);
    }
    

  }
  