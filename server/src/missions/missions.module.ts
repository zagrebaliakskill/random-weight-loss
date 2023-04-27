import { Module } from '@nestjs/common';
import { MissionsService } from './missions.service';
import { MissionsController } from './missions.controller';
import { MissionEntity } from './entities/mission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entites/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, MissionEntity]),
  ],
  controllers: [MissionsController],
  providers: [MissionsService, UsersService],
})
export class MissionsModule {}
