
import { Controller} from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("FIXTURE")
@Controller('tournamentfixture')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

}
