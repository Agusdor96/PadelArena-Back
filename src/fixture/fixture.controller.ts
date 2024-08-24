
import { Controller, Post, Body, Param, ParseUUIDPipe} from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { FixtureDto } from './dto/fixture.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("FIXTURE")
@Controller('tournament/fixture')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}
  @Post(':tournamentId')
  create(@Param('tournamentId', ParseUUIDPipe) tournamentId:string, @Body() fixtureDto: FixtureDto) {
    return this.fixtureService.createFixture(tournamentId, fixtureDto);
  }

}
