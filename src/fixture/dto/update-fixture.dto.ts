import { PartialType } from '@nestjs/swagger';
import { CreateFixtureDto } from './create-fixture.dto';

export class UpdateFixtureDto extends PartialType(CreateFixtureDto) {}
