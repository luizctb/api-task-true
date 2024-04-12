/* eslint-disable prettier/prettier */
export class TaskDto {    
    id: string;
    title: string;
    description: string;
    status: string;
    expirationDate: Date;
    length: any;    
}

export interface FindAllParameters {
    title: string;
    status: string;    
}