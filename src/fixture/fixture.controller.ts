
import { Body, Controller, Get, Param, ParseUUIDPipe, Put, UseGuards} from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MatchIdDTO } from './dto/matchId.dto';
import { Roles } from '../decorators/roles.decorator';
import { RoleEnum } from '../user/roles.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { SwaggerGetFixture, SwaggerUpdateMatchWinner } from '../decorators/SwaggerDecorators/Fixture.decorator';

@ApiTags("FIXTURE")
@Controller('tournamentfixture')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

  @ApiBearerAuth()
  @Roles(RoleEnum.ADMIN)
  @Put('matchWinner/:winnerId')
  @SwaggerUpdateMatchWinner()
  @UseGuards(AuthGuard,RolesGuard)
  addWinners (@Param('winnerId', ParseUUIDPipe) winnerId: string, @Body() matchId: MatchIdDTO) {
    return this.fixtureService.uploadWinners(matchId, winnerId)
  }

  @Get("/:fixtureId")
  @SwaggerGetFixture()
  getOneFixture(@Param("fixtureId", ParseUUIDPipe)fixtureId: string){
    return this.fixtureService.getOneFixture(fixtureId)
  }

}
