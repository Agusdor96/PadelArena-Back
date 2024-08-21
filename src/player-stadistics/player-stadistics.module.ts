import { Module } from '@nestjs/common';
import { PlayerStadisticsService } from './player-stadistics.service';
import { PlayerStadisticsController } from './player-stadistics.controller';

@Module({
  controllers: [PlayerStadisticsController],
  providers: [PlayerStadisticsService],
})
export class PlayerStadisticsModule {}
