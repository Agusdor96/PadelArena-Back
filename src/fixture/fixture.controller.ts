
import { Body, Controller, Param, ParseUUIDPipe, Put} from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { ApiTags } from '@nestjs/swagger';
import { matchIdDTO } from './dto/matchId.dto';

@ApiTags("FIXTURE")
@Controller('tournamentfixture')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

  @Put('matchWinner/:winnerId')
  addWinners (@Param('winnerId', ParseUUIDPipe) winnerId: string, @Body() matchId: matchIdDTO) {
    return this.fixtureService.uploadWinners(matchId, winnerId)
  }

}
