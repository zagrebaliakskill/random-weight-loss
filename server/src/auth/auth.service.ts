import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entites/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOneByUserName(username)
        if (user && (await bcrypt.compare(password, user.password))) {
            const {password, missions, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user) {
        const payload = {
            username: user.name,
            id: user.id,
            token_version: user.token_version
        }

        const data = {
            user: {
                name: user.name,
                balance: user.balance,
                xp: user.xp
            },
            accessToken: this.jwtService.sign(payload),
            refreshToken: this.jwtService.sign(payload, {expiresIn: '30d'})
        }

        return data
    } 

    async updateAccessToken(user: {id: number, username: string, token_version: number}) {
        const payload = {
            username: user.username,
            id: user.id,
        }
        const { token_version, balance, xp } = await this.userService.findOneByUserId(user.id)
        const refresh_token_version = user.token_version

        if (token_version === refresh_token_version) {
            return {
                user: {
                    name: user.username,
                    balance,
                    xp,
                },
                accessToken: this.jwtService.sign(payload),
            }
        } else {
            return {
                status: 'user change password',
            };
        }
    }
}
