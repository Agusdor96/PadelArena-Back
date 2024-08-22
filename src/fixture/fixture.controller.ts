import { Controller, Post, Body, Param, ParseUUIDPipe} from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { CreateFixtureDto } from './dto/create-fixture.dto';

@Controller('tournament/fixture')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

  @Post(':tournamentId')
  create(@Param('tournamentId', ParseUUIDPipe) tournamentId:string, @Body() createFixtureDto: CreateFixtureDto) {
    return this.fixtureService.createFixture(tournamentId, createFixtureDto);
  }

}
