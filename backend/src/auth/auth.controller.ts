import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("login") 
    async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response){
        const result = await  this.authService.login(
            body.email,
            body.password
        );
        res.cookie("token", result.token, {
            httpOnly: true,
            secure: false,
            maxAge: 10 * 24 * 60 * 60 * 1000
        })

        return result
    }
}   

