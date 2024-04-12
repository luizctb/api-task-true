/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';

@Injectable()
export class TaskService {

    private tasks: TaskDto[] = [];
    // criar pelo POST
    create(task: TaskDto) {
        this.tasks.push(task);
        console.log(this.tasks);
    }
    // buscar pelo GET
    findById(id: string): TaskDto {
        const foundTask = this.tasks.filter(t => t.id === id);

        if (foundTask.length) {
            return foundTask[0]
        }

        throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    findAll(params: FindAllParameters): TaskDto[] {
        return this.tasks.filter(t => {
            let match = true;
        
            if (params.title != undefined && !t.title.includes(params.title)) {
                match = false
            }

            if (params.status != undefined && !t.status.includes(params.status)) {
                match = false
            }

            return match;
        })        
    }

    // atualizar pelo pelo PUT
    update(task: TaskDto) {
        let taskIndex = this.tasks.findIndex(t => t.id === task.id);

        if (taskIndex >=0) {
            this.tasks[taskIndex] = task;
            return;
        }

        throw new HttpException(`Task with id ${task.id} not found`, HttpStatus.BAD_REQUEST); 
    }
    //deletar pelo Delete
    remove(id: string){
        let taskIndex = this.tasks.findIndex(t => t.id === id);

        if (taskIndex >= 0) {
            this.tasks.splice(taskIndex, 1); //método splice de remover itens do array 
            return
        }

        throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST); 
    }
}
