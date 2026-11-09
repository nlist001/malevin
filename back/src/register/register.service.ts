import { Inject, Injectable, Logger } from '@nestjs/common';
import { RegisterRepository } from './register.repository';
import { FilterDTO, RegisterDTO } from './register.dto';
import { IRegisterList } from './register.model';
import { RegisterEntity } from './register.entity';

@Injectable()
export class RegisterService {
  private logger = new Logger('RegisterService');

  constructor(
    @Inject('IRegisterRepository') 
    private readonly registerRepository: RegisterRepository,
  ) {}

  async getRegisterList(filterDto: FilterDTO): Promise<IRegisterList> {
 
    const [data, total] = await this.registerRepository.findAndCount( filterDto);

    return {
      data,
      total,
    };

  }


  async getRegister(id: string): Promise<RegisterEntity | null> {
    this.logger.verbose('getRegister id: ',id)
    const j = await this.registerRepository.getRegister(id);
    this.logger.verbose('getJob j: ',j)

    return j;
  }


  async creatRegister(registerDTO: RegisterDTO): Promise<RegisterEntity> {
    return await this.registerRepository.create( registerDTO);
  }


  

}
