
import { Controller, Post, Body, Param, ParseUUIDPipe} from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { FixtureDto } from './dto/fixture.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("FIXTURE")
@Controller('tournamentfixture')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}
  @Post(':id')
  async create(@Param('id', ParseUUIDPipe) id:string, @Body() fixtureDto ?: FixtureDto) {
    return await this.fixtureService.createFixture(id);
  }

}
