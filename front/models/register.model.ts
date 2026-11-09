import { BaseModel } from "./BaseModel";
import { IUser } from "./user.model";

export interface IJob {
    id: string;
    title: string;
    users?: IUser[];
}
export class Job implements IJob {
    id ='';
    title ='';
}

export interface IRegisterResponce {
    data: IRegister[];
    total: number;
}
export interface IRegister {
    id: string;
    created: string;
    updated: string;
    job_date: string;
    job: IJob;
    users: IUser[];
}

export class Register extends BaseModel<IRegister> implements IRegister {
    id ='';
    created = '';
    updated = '';
    job_date = '';
    job = new Job();
    users = [];

    constructor(o?: any) {
        super();
        super.checkFields(o);
        if (o?.job_date) {
            this.job_date = new Intl.DateTimeFormat('ru').format(new Date(o.job_date))
        }
    }
}