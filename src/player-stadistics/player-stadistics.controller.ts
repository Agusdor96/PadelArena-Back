import { Controller, Get, Param, ParseUUIDPipe} from '@nestjs/common';
import { PlayerStadisticsService } from './player-stadistics.service';
import { ApiTags } from '@nestjs/swagger';
import { CustomGetStadistics } from 'src/decorators/controllerDecorators/playerStadistics.decorator';

@ApiTags("ESTADISTICAS DE JUGADORES")
@Controller('player-stadistics')
export class PlayerStadisticsController {
  constructor(private readonly playerStadisticsService: PlayerStadisticsService) {}

  @Get(":playerId")
  @CustomGetStadistics()
  getPlayerStadistics(@Param("playerId", ParseUUIDPipe) playerId: string){
    return this.playerStadisticsService.getPlayerStadistics(playerId)
  }
}
