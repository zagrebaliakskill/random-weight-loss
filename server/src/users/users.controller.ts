import { Controller, Post} from '@nestjs/common';
import { Req, UseGuards } from '@nestjs/common/decorators';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService,) {}

    @Post('getStats')
    @UseGuards(JwtGuard)
    async getStats(@Req() req) {
        return this.usersService.getUserStats(req.user.id)
    }
}
