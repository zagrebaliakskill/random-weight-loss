import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { MissionEntity } from './entities/mission.entity';

@Injectable()
export class MissionsService {
    constructor(
        @InjectRepository(MissionEntity)
        private readonly missionRepository: Repository<MissionEntity>,
        private readonly userService: UsersService  
    ){}

    async findOne(id: number) {
        return await this.missionRepository.findOne({where: {id: id}})
    }

    async findManyByIds(missionIds: []) {
        return await this.missionRepository.createQueryBuilder('mission')
            .where('mission.id IN (:...missionIds)', { missionIds })
            .getMany();
    }

    async startMission(userId: number, missionId: number) {
        return await this.userService.setMissionStarted(userId, missionId)
    }

    async finishMission(userId: number, missionId: number) {
        const setMissionFinished = await this.userService.setMissionFinished(userId, missionId);
        if (!setMissionFinished) {
            return false
        }
        const { xp, balance} = await this.findOne(missionId)
        await this.userService.editBalance(userId, balance)
        await this.userService.editXp(userId, xp)
        return true
    }

    async getMissions(uid) {
        let active_missions =  await this.userService.getUserActiveMissions(uid)
        if (!active_missions) {
            return false
        }
        let active_missions_ids = active_missions.map(mission => mission.missionId)
        let missions = await this.findManyByIds(active_missions_ids)
        missions = missions.map(mission => {
            const activeMission = active_missions.find(am => am.missionId === mission.id);
            return {...mission, status: activeMission.status};
        });
        return missions
    }

    async getRandomMissionIds(count: number, difficulty: number) {
        const allMissions = await this.missionRepository.find()
        const filteredMissions = allMissions.filter(mission => mission.difficulty < Math.floor(difficulty/100) + 1); // 0 XP / 100 = 0 ЛВЛ, у нас старт с 1 лвла поэтому + 1
        const missionIds = filteredMissions.map(mission => mission.id);
        const randomIds = [];
        while (randomIds.length < count && missionIds.length > 0) {
          const randomIndex = Math.floor(Math.random() * missionIds.length);
          const randomId = missionIds.splice(randomIndex, 1)[0];
          randomIds.push(randomId);
        }
        return randomIds;
    }

    async getMissionsWithDailyUpdate(userId: number) {
        const user = await this.userService.findOneByUserId(userId);
        let activeMissions = user.missions ? JSON.parse(user.missions) : [];
        activeMissions = activeMissions.filter(mission => mission.status !== "finished");
        while (activeMissions.length < 5) {
            const randomMissionIds = await this.getRandomMissionIds(5 - activeMissions.length, user.xp);
            for (let missionId of randomMissionIds) {
                if (!activeMissions.some(mission => mission.missionId === missionId)) {
                    activeMissions.push({missionId, status: "active"});
                    await this.userService.addActiveMission(userId, missionId);
                }
                if (activeMissions.length === 5) {
                    break;
                }
            }
        }
        return activeMissions;
    }
}


