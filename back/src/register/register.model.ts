import { RegisterEntity } from "./register.entity";



export interface IRegister {
    id: string;
  
    created: Date;
  
    updated: Date;
  
    job_date: Date;
  
    fio: string;
  
    title: string;
  
  }

export interface IRegisterList {
    data: RegisterEntity[];
    total: number;
}


