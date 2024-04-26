/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
    Put, 
    Query, UseGuards } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskRouteParameters } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskEntity } from 'src/db/entities/task.entity';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
        
    constructor(private readonly taskService: TaskService) {}

    @Post() // criar informação
    async create(@Body() task: TaskDto): Promise<TaskEntity> {
        return await this.taskService.create(task);        
    }

    @Get('/:id') // buscar informação
    async findById(@Param('id') id:string): Promise<TaskDto> {
        return this.taskService.findById(id);
    }

    @Get()
    async findAll(@Query() params: FindAllParameters): Promise<TaskDto[]> {
        return this.taskService.findAll(params);
    }
   
    @Put('/:id') // atualizar informação
    async update(@Param() params: TaskRouteParameters, @Body() task: TaskDto): Promise<void> {
        await this.taskService.update(params.id, task);
    }

    @Delete('/:id') 
    async remove(@Param('id') id: string): Promise<void> {
        return this.taskService.remove(id);    
    }
}
