
import { Body, Controller, Get, Param, ParseUUIDPipe, Put} from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { ApiTags } from '@nestjs/swagger';
import { MatchIdDTO } from './dto/matchId.dto';

@ApiTags("FIXTURE")
@Controller('tournamentfixture')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

  @Put('matchWinner/:winnerId')
  addWinners (@Param('winnerId', ParseUUIDPipe) winnerId: string, @Body() matchId: MatchIdDTO) {
    return this.fixtureService.uploadWinners(matchId, winnerId)
  }

  @Get("/:fixtureId")
  getOneFixture(@Param("fixtureId", ParseUUIDPipe)fixtureId: string){
    return this.fixtureService.getOneFixture(fixtureId)
  }

}
