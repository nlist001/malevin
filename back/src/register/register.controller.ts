import { Controller, Get, Logger, Post, Query, Body } from '@nestjs/common';
import { FilterDTO, RegisterDTO } from './register.dto';
import { IRegisterList } from './register.model';
import { RegisterEntity } from './register.entity';
import { RegisterService } from './register.service';



@Controller()
export class RegisterController {
  private logger = new Logger('RegisterController');

  constructor(
    private readonly registerService: RegisterService,

  ) {}

  @Get('/register')
  async getRegisterList(@Query() filterDto: FilterDTO): Promise<IRegisterList> {
    this.logger.verbose('filterDto',filterDto)
    return await this.registerService.getRegisterList(filterDto);
  }

  @Post('/register')
  async creatRegister(@Body() registerDTO: RegisterDTO): Promise<RegisterEntity> {
    this.logger.verbose('filterDto',registerDTO)
    return await this.registerService.creatRegister(registerDTO);
  }

}

