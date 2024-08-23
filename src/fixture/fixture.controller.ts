import { Controller} from '@nestjs/common';
import { FixtureService } from './fixture.service';


@Controller('fixture')
export class FixtureController {
  constructor(private readonly fixtureService: FixtureService) {}

  
}
