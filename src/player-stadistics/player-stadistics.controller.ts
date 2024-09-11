import { Controller, Get, Param, ParseUUIDPipe, UseGuards} from '@nestjs/common';
import { PlayerStadisticsService } from './player-stadistics.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags("ESTADISTICAS DE JUGADORES")
@Controller('player-stadistics')
export class PlayerStadisticsController {
  constructor(private readonly playerStadisticsService: PlayerStadisticsService) {}

  @ApiBearerAuth()
  @Get(":playerId")
  @UseGuards(AuthGuard)
  getPlayerStadistics(@Param("playerId", ParseUUIDPipe) playerId: string){
    return this.playerStadisticsService.getPlayerStadistics(playerId)
  }
  
}
