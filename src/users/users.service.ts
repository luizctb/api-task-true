/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync as bcryptHashSync } from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly users: UserDto[] = [] 

    //método de criação de usuário
    create(newUser: UserDto) {
        newUser.id = uuid(); //importar (import { v4 as uuid } from 'uuid';)
        newUser.password = bcryptHashSync(newUser.password, 10); //importar (import { hashSync as bcryptHashSync } from 'bcrypt';)
        this.users.push(newUser);        
    }

    findByUserName(username: string): UserDto | null {
        return this.users.find(user => user.username === username);
    }
}
