/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from './autth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly AuthService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(
        @Body('username') username: string,
        @Body('password') password: string
    ): Promise<AuthResponseDto> {
        return await this.AuthService.signIn(username, password);
    }
}
