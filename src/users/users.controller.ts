/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService){}

    @Post()
    create(@Body() user: UserDto) {
        this.UsersService.create(user); // esse users tem que criar na service
    }
}
