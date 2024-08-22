import { Module } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { FixtureController } from './fixture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { Fixture } from './entities/fixture.entity';
import { Round } from './entities/round.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Fixture, Round])],
  controllers: [FixtureController],
  providers: [FixtureService],
})
export class FixtureModule {}
