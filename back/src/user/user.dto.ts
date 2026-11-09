import {IsString, MaxLength, IsOptional, IsDate, IsArray, IsUUID} from 'class-validator';



export class UserDTO {
  
    @IsString()
    @MaxLength(200)
    fio: string;

    @IsArray({ message: 'Поле jobs должно быть массивом' })
    @IsUUID('all', { each: true, message: 'Каждый элемент в jobs должен быть валидным UUID' })
    jobsIds: string[];


    @IsOptional()
    @IsUUID('all', {  message: 'Должен быть валидным UUID' })
    registerId: string | null = null;
}

export class UpdateUserDTO {
    @IsUUID('all', {  message: 'Должен быть валидным UUID' })
    id: string;

    @IsString()
    @MaxLength(200)
    fio: string;

    @IsArray({ message: 'Поле jobs должно быть массивом' })
    @IsUUID('all', { each: true, message: 'Каждый элемент в jobs должен быть валидным UUID' })
    jobsIds: string[];


    @IsOptional()
    @IsUUID('all', {  message: 'Должен быть валидным UUID' })
    registerId: string | null = null;
}
  
