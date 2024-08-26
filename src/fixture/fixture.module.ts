import { Module } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { FixtureController } from './fixture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { Fixture } from './entities/fixture.entity';
import { Round } from './entities/round.entity';
import { MatchService } from 'src/match/match.service';
import { Match } from 'src/match/entities/match.entity';
import { Team } from 'src/team/entities/team.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, Fixture, Round, Match, Team])],
  controllers: [FixtureController],
  providers: [FixtureService, MatchService],
  exports:[FixtureService]
})
export class FixtureModule {}
