/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* colocar (+) representa mudar para número. */

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { AuthResponseDto } from './autth.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number; 

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        this.jwtExpirationTimeInSeconds = +this.configService.get<number>(
            'JWT_EXPIRATION_TIME',
        );
    }

    async signIn(username: string, password: string): Promise<AuthResponseDto> {
        const foundUser = await this.usersService.findByUserName(username);

        if (!foundUser || !bcryptCompareSync(password, foundUser.password)){
            throw new UnauthorizedException();            
        }

        const payload = { sub: foundUser.id, username: foundUser.username };

        const token = this.jwtService.sign(payload); 
        return { token, expiresIn: this.jwtExpirationTimeInSeconds };
    }
}
