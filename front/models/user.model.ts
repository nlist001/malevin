import { IJob, IRegister } from "./register.model";

export interface IUser {
    id: string;
    created: string;
    updated: string;
    fio: string;
    jobs: IJob[];
    register: IRegister | null;
}

