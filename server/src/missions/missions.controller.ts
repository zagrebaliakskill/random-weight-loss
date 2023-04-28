import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { MissionsService } from './missions.service';

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

    @UseGuards(JwtGuard)
    @Post('/finishMission')
    async finishMission(@Req() req) {
        const user_id = req.user.id;
        const mission_id = req.body.mission_id;
        return await this.missionsService.finishMission(user_id, mission_id)
    }
    
    @UseGuards(JwtGuard)
    @Post('/getMissions')
    async test(@Req() req) {
        const user_id = req.user.id
        return await this.missionsService.getMissions(user_id)
    }

    @UseGuards(JwtGuard)
    @Post('/startMission')
    async startMission(@Req() req) {
        const user_id = req.user.id;
        const mission_id = req.body.mission_id;
        return await this.missionsService.startMission(user_id, mission_id)
    }

    @UseGuards(JwtGuard)
    @Post('/deleteMission')
    async deleteMission(@Req() req) {
        const user_id = req.user.id;
        const mission_id = req.body.mission_id;
        return await this.missionsService.deleteMission(user_id, mission_id)
    }

    @Post('/test')
    async test1() {
        return this.missionsService.getRandomMissionIds(1, 100)
    }
}
