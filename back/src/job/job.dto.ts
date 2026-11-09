import {IsString, MaxLength, IsOptional, IsDate, IsArray, IsUUID} from 'class-validator';


export class JobDTO {
  
    @IsString()
    @MaxLength(200)
    title: string;
  
}

export class JobsDTO {
    @IsOptional()
    @IsArray({ message: 'Поле должно быть массивом' })
    @IsUUID('all', { each: true, message: 'Каждый элемент должен быть валидным UUID' })
    ids?: string[];
  
}
  
