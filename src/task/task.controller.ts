/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    TaskService: any;

    constructor(private readonly taskService: TaskService) {}

    @Post() // criar inf
    create(@Body() task: TaskDto){
        return this.taskService.create(task);        
    }

    @Get('/:id') // pushar inf
    findById(@Param('id') id:string): TaskDto {
        return this.taskService.findById(id);
    }

    @Get()
    findAll(@Query() params: FindAllParameters): TaskDto[] {
        return this.TaskService.findById(params)
    }
   
    @Put() //alterar inf 
    update(@Body() task: TaskDto){
        return this.taskService.update(task);
    }

    @Delete('/:id') 
    remove(@Param('id') id: string){
        return this.taskService.remove(id);    
    }
}
