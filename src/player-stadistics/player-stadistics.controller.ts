import { Controller, Get, Param, ParseUUIDPipe, UseGuards} from '@nestjs/common';
import { PlayerStadisticsService } from './player-stadistics.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/user/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags("PLAYER-STADISTICS")
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
