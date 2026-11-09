import { Controller, Get, Logger, Post, Query, Body, ParseUUIDPipe, Param, Put } from '@nestjs/common';

import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { UpdateUserDTO, UserDTO } from './user.dto';

@Controller()
export class UserController {
  private logger = new Logger('UserController');

  constructor(

    private readonly userService: UserService,

  ) {}


  @Get('/users')
  async getUsers(): Promise<UserEntity[]> {
    this.logger.verbose('getUsers')
    return await this.userService.getUsers();
  }

  @Post('/user')
  async creatUser(@Body() userDTO: UserDTO): Promise<UserEntity> {
    this.logger.verbose('creatUser userDTO',userDTO)
    return await this.userService.addUser(userDTO);
  }
  @Put('/user')
  async updateUser(@Body() userDTO: UpdateUserDTO ): Promise<UserEntity | null> {
    this.logger.verbose('updateUser userDTO',userDTO)
    return await this.userService.updateUser(userDTO);
  }

  @Get('/user/:id')
  async getUser( @Param('id', ParseUUIDPipe) id: string ): Promise<UserEntity | null> {
    this.logger.verbose('getUser id: ',id)
    return await this.userService.getUser(id);
  }

  

}

