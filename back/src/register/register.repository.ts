import { BadRequestException, forwardRef, Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterEntity } from "./register.entity";
import { FilterDTO, RegisterDTO } from "./register.dto";
import { Repository } from "typeorm";
import { JobService } from "../job/job.service";
import { UserService } from "src/user/user.service";
// import { UserDTO } from "src/user/user.dto";
// import { JobEntity } from "src/job/job.entity";




@Injectable()
export class RegisterRepository {
  private logger = new Logger('RegisterRepository');
  constructor(
    @InjectRepository(RegisterEntity)
    private readonly repo: Repository<RegisterEntity>,
    private readonly jobService: JobService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}


  async findAndCount(filterDto?: FilterDTO): Promise<[RegisterEntity[], number]> {
    const query = this.repo.createQueryBuilder('register');
    this.logger.verbose('findAndCount filterDto: ',filterDto)

    query.innerJoinAndSelect(
      "register.job",
      "jobs",
      "register.jobId = jobs.id"
    )
    query.leftJoinAndSelect(
      "register.users",
      "user",
      "user.registerId = register.id"
    )

    query.orderBy('job_date', filterDto?.date_order || 'DESC');

    return await query.getManyAndCount();
    //return this.repo.findAndCount(options);
  }



  async getRegister(id: string): Promise<RegisterEntity | null> {
    return await this.repo.findOne({
        where: { id },
        relations: {
          job: true
        }
      });
  }

  private async save(task: Partial<RegisterEntity>): Promise<RegisterEntity> {
    return await this.repo.save(task);
  }

  async create(data: RegisterDTO): Promise<RegisterEntity> {
    const job = await this.jobService.getJob(data.jobId)
    const users = await this.userService.getUsers(data.usersIds)
    this.logger.verbose('job',job );

    if (!job) {
        throw new NotFoundException(`Тип работ с ID ${data.jobId} не найден`);
    }
    if (!users || users.length == 0) {
        throw new NotFoundException(`Пользователи не найдены`);
    }
    
    const newTask = this.repo.create({job_date: data.job_date, job, users});
    this.logger.verbose('newTask',newTask);

    return await this.save(newTask);
  }



  // async findDataForUser(userDTO: UserDTO): Promise<{ jobs: JobEntity[]; register: RegisterEntity | null; }> {
  //   const jobs = await this.jobService.getJobs(userDTO.jobsIds)
  //   let register: RegisterEntity | null = null;

  //   if(userDTO.registerId) {
  //     register = await this.getRegister(userDTO.registerId);
  //     if(register && !jobs.map(j=>j.id).includes(register.job.id)) {
  //       throw new BadRequestException('Навыки пользователя не соответствуют типам работ указанных в журнале')
  //     }
  //   }
  //   return {jobs, register}
  // }

  // async update(data: UpdateTaskDTO): Promise<TaskEntity> {
  //   const updatedTask = await this.repo.preload(data);
  //   this.logger.verbose('updatedTask', updatedTask)
  //   if (!updatedTask) {
  //     throw new NotFoundException(`Задача с ID ${data.id} не найдена`);
  //   }

  //   return this.repo.save(updatedTask);
  // }

  // async delete(id: string): Promise<DeleteResult> {
  //   return this.repo.delete(id);
  // }
}