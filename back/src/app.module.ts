import { Module } from '@nestjs/common';
import { JobController } from './job/job.controller';
import { RegisterService } from './register/register.service';
import { JobService } from './job/job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RegisterEntity } from './register/register.entity';
import { JobEntity } from './job/job.entity';
import { RegisterRepository } from './register/register.repository';
import { UserEntity } from './user/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { RegisterController } from './register/register.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log(config.get<string>('NODE_ENV'), config.get<string>('NODE_ENV') === 'development')
        return {
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,//config.get<string>('NODE_ENV') === 'development', 
        logging: config.get<string>('NODE_ENV') === 'development' ? ['query', 'error'] : ['error'],
      }}
    }),
    TypeOrmModule.forFeature([RegisterEntity,JobEntity, UserEntity]),
  ],
  
  controllers: [JobController, UserController, RegisterController],
  providers: [RegisterService, JobService, UserService,
      {
        provide: 'IRegisterRepository', // Токен для инъекции
        useClass: RegisterRepository,
      },
  ],
})
export class AppModule {}
