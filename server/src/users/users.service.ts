import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { UserEntity } from './entites/user.entity';
import * as bcrypt from 'bcrypt';
import { MissionsService } from 'src/missions/missions.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async createUser(user: CreateUserDto) {
        const username = await this.findOneByUserName(user.name)
        if (username) {
            return "username already exists"
        }
        const email = await this.findOneByEmail(user.email)
        if (email) {
            return "email already exists"
        }
        user.password = await bcrypt.hash(user.password, 10)
        await this.userRepository.save(user)
        return true
    }

    async findOneByUserId(userId: number) {
        return await this.userRepository.findOne({where: {id: userId}})
    }

    async findOneByUserName(userName: string) {
        return await this.userRepository.findOne({where: {name: userName}})
    }

    async findOneByEmail(email: string) {
        return await this.userRepository.findOne({where: {email}})
    }

    async editBalance(userId: number, number: number) {
        const { balance } = await this.findOneByUserId(userId)
        const operation = await this.userRepository.update({id: userId}, {balance: balance + (number)})
        if (operation) {
            return true
        } else {
            return false
        }
    }

    async editXp(userId: number, number: number) {
        const { xp } = await this.findOneByUserId(userId)
        const operation = await this.userRepository.update({id: userId}, {xp: xp + (number)})
        if (operation) {
            return true
        } else {
            return false
        }
    }

    async addActiveMission(userId: number, missionId: number) {
        const user = await this.findOneByUserId(userId);
        let missions = user.missions ? JSON.parse(user.missions) : [];
        missions.push({"missionId": missionId, "status": "active"});
        user.missions = JSON.stringify(missions);
        await this.userRepository.save(user);
    }

    async setMissionFinished(userId: number, missionId: number) {
        const user = await this.findOneByUserId(userId)
        let setMissionFinishedState = false
        if (!user) {
            return false
        }
        let missions = user.missions ? JSON.parse(user.missions) : null;
        if (!missions) {
            return false
        }
        missions = missions.map((e) => {
            if (e.missionId === missionId && e.status !== 'finished'){
                e.status = "finished"
                setMissionFinishedState = true
            }
            return e
        })
        user.missions = JSON.stringify(missions);
        await this.userRepository.save(user);
        return setMissionFinishedState
    }

    async setMissionStarted(userId: number, missionId: number) {
        const user = await this.findOneByUserId(userId)
        let setMissionStartedState = false
        if (!user) {
            return false
        }
        let missions = user.missions ? JSON.parse(user.missions) : null;
        if (!missions) {
            return 
        }
        missions = missions.map((e) => {
            if (e.missionId === missionId && e.status === "active"){
                e.status = "started"
                setMissionStartedState = true
            }
            return e
        })
        user.missions = JSON.stringify(missions);
        await this.userRepository.save(user);
        return setMissionStartedState
    }

    async getUserActiveMissions(userId: number) {
        const user = await this.findOneByUserId(userId)
        let missions = user.missions ? JSON.parse(user.missions) : null;
        if (!missions) {
            return null;
        }
        missions = missions.map((e) => {
            if (e.status !== "finished") {
                return e
            }
        }).filter(id => id !== undefined )
        if (missions == null) {
            console.log(missions)
            return null;
        } 
        return missions
    }

    async getUserFinishedMissions(userId: number, missionId: number) {
        const user = await this.findOneByUserId(userId)
        let missions = user.missions ? JSON.parse(user.missions) : null;
        missions = missions.map((e) => {
            if (e.status === "finished") {
                return e
            }
        })
        return missions
    }
}
