import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entites/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionEntity } from 'src/missions/entities/mission.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, MissionEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
