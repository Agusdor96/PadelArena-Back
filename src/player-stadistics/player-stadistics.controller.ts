import { Controller} from '@nestjs/common';
import { PlayerStadisticsService } from './player-stadistics.service';


@Controller('player-stadistics')
export class PlayerStadisticsController {
  constructor(private readonly playerStadisticsService: PlayerStadisticsService) {}

  
}
