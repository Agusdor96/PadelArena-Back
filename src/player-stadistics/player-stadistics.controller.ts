import { Controller, Get, Param, ParseUUIDPipe} from '@nestjs/common';
import { PlayerStadisticsService } from './player-stadistics.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("PLAYER-STADISTICS")
@Controller('player-stadistics')
export class PlayerStadisticsController {
  constructor(private readonly playerStadisticsService: PlayerStadisticsService) {}

  @Get(":playerId")
  getPlayerStadistics(@Param("playerId", ParseUUIDPipe) playerId: string){
    return this.playerStadisticsService.getPlayerStadistics(playerId)
  }
  
}
