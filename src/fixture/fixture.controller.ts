import { Body, Controller, Get, Param, ParseUUIDPipe, Put, UseGuards} from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { ApiTags } from '@nestjs/swagger';
import { MatchIdDTO } from './dto/matchId.dto';
import { CustomGetFixture, CustomUpdateWinners } from 'src/decorators/controllerDecorators/fixtureController.decorator';

@ApiTags("FIXTURE")
@Controller('tournamentfixture')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

  @Put('matchWinner/:winnerId')
  @CustomUpdateWinners()
  addWinners (@Param('winnerId', ParseUUIDPipe) winnerId: string, @Body() matchId: MatchIdDTO) {
    return this.fixtureService.uploadWinners(matchId, winnerId)
  }

  @Get("/:fixtureId")
  @CustomGetFixture()
  getOneFixture(@Param("fixtureId", ParseUUIDPipe)fixtureId: string){
    return this.fixtureService.getOneFixture(fixtureId)
  }
}
