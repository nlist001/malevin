import {IsString, MaxLength, IsOptional, IsDate, IsArray, IsUUID} from 'class-validator';



export class FilterDTO  {
    @IsString()
    @IsOptional()
    @MaxLength(4)
    date_order?: 'DESC' | 'ASC' = 'DESC';
}


export class RegisterDTO {
    @IsDate()
    job_date: Date;

    @IsArray({ message: 'Поле usersIds должно быть массивом' })
    @IsUUID('all', { each: true, message: 'Каждый элемент в usersIds должен быть валидным UUID' })
    usersIds: string[];
  
    @IsUUID('all', {  message: 'Должен быть валидным UUID' })
    jobId: string;
  
}
  