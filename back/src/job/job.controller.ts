import { Controller, Get, Logger, Post, Query, Body, ParseUUIDPipe, Param, Put, Delete } from '@nestjs/common';
import { JobService } from './job.service';
import { JobDTO, JobsDTO } from './job.dto';
import { JobEntity } from './job.entity';


@Controller()
export class JobController {
  private logger = new Logger('JobController');

  constructor(
    private readonly jobService: JobService,

  ) {}


  @Get('/jobs')
  async getJobs(): Promise<JobEntity[]> {
    this.logger.verbose('getJobs')
    return await this.jobService.getJobs();
  }

  @Post('/jobs')
  async postJobs(@Body() jobsDTO?: JobsDTO): Promise<JobEntity[]> {
    this.logger.verbose('getJobs')
    return await this.jobService.getJobs(jobsDTO?.ids);
  }

  @Post('/job')
  async creatJob(@Body() jobDTO: JobDTO): Promise<JobEntity> {
    this.logger.verbose('creatJob jobDTO',jobDTO)
    return await this.jobService.addJob(jobDTO);
  }

  @Delete('/job/:id')
  async deketeJob(@Param('id', ParseUUIDPipe) id: string): Promise<JobEntity | null> {
    this.logger.verbose('del job jobDTO',id)
    return await this.jobService.delJob(id);
  }

  

}

