import { Body, Controller, Post, Request, UseGuards, Response } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Response({ passthrough: true }) res) {
        const data = await this.authService.login(req.user);
        const { refreshToken, ...updatedData } = data
        console.log(updatedData)
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        return updatedData
    }

    @Post('register')
    async register(@Body() body: CreateUserDto) {
        return await this.userService.createUser(body);
    }

    @UseGuards(JwtGuard)
    @Post('test')
    async test(@Request() req) {
        return req.user
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async updateAccessToken(@Request() req) {
        return this.authService.updateAccessToken(req.user);
    }
}
