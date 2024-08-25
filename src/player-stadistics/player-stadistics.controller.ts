import { Controller} from '@nestjs/common';
import { PlayerStadisticsService } from './player-stadistics.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("PLAYER-STADISTICS")
@Controller('player-stadistics')
export class PlayerStadisticsController {
  constructor(private readonly playerStadisticsService: PlayerStadisticsService) {}

  
}
