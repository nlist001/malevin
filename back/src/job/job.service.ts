
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JobDTO } from './job.dto';
import { JobEntity } from './job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
  
  @Injectable()
  export class JobService {
    private logger = new Logger(' JobService ');
  
    constructor(
        @InjectRepository(JobEntity)
        private readonly repo: Repository<JobEntity>,
    ) {}
  
    async getJobs(ids?: string[]): Promise<JobEntity[]> {
        if(ids){
          return await this.repo.find({
            where: {id: In(ids) },
            relations:{
              users:true
            }
          });
        }
        return await this.repo.find();
    }

    async getJob(id: string): Promise<JobEntity | null> {
      this.logger.verbose('getJob id: ',id)
      const j = await this.repo.findOne({
        where: { id }
      });
      this.logger.verbose('getJob j: ',j)

    return j;
  }
  
    async addJob(jobDTO: JobDTO): Promise<JobEntity> {
      const newJob = await this.repo.create( jobDTO);
      this.logger.verbose('newJob',newJob)

      return this.repo.save(newJob)
    }


    async delJob(id: string): Promise<JobEntity | null> {
      const job = await this.repo.findOne({
        where: { id }
      });
      if(job) {
        this.repo.remove(job);
        return job;
      }
      throw new NotFoundException('Запись не найдена');
    }
  
  
    
  
  }
  