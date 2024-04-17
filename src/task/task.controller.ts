/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskRouteParameters } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
        
    constructor(private readonly taskService: TaskService) {}

    @Post() // criar inf
    async create(@Body() task: TaskDto): Promise<TaskDto> {
        return await this.taskService.create(task);        
    }

    @Get('/:id') // pushar inf
    async findById(@Param('id') id:string): Promise<TaskDto> {
        return this.taskService.findById(id);
    }

    @Get()
    async findAll(@Query() params: FindAllParameters): Promise<TaskDto[]> {
        return this.taskService.findAll(params);
    }
   
    @Put('/.id') //alterar inf 
    async update(@Param() params: TaskRouteParameters, @Body() task: TaskDto) {
        await this.taskService.update(params.id, task);
    }

    @Delete('/:id') 
    async remove(@Param('id') id: string): Promise<void> {
        return this.taskService.remove(id);    
    }
}
