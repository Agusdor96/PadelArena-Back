import { Module } from '@nestjs/common';
import { PlayerStadisticsService } from './player-stadistics.service';
import { PlayerStadisticsController } from './player-stadistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { PlayerStadistic } from './entities/player-stadistic.entity';
import { Team } from '../team/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, PlayerStadistic, Team])],
  controllers: [PlayerStadisticsController],
  providers: [PlayerStadisticsService],
  exports: [PlayerStadisticsService]
})
export class PlayerStadisticsModule {}
