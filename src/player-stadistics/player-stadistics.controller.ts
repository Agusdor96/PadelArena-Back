import { Controller, Get, Param, ParseUUIDPipe, UseGuards} from '@nestjs/common';
import { PlayerStadisticsService } from './player-stadistics.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { SwaggerGetStadistics } from 'src/decorators/SwaggerDecorators/Stadistics.decorator';

@ApiTags("ESTADISTICAS DE JUGADORES")
@Controller('player-stadistics')
export class PlayerStadisticsController {
  constructor(private readonly playerStadisticsService: PlayerStadisticsService) {}

  @ApiBearerAuth()
  @Get(":playerId")
  @SwaggerGetStadistics()
  @UseGuards(AuthGuard)
  getPlayerStadistics(@Param("playerId", ParseUUIDPipe) playerId: string){
    return this.playerStadisticsService.getPlayerStadistics(playerId)
  }
  
}
