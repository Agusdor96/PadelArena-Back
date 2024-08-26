import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { Tournament } from './entities/tournament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Fixture } from 'src/fixture/entities/fixture.entity';
import { FixtureService } from 'src/fixture/fixture.service';
import { Round } from 'src/fixture/entities/round.entity';
import { Team } from 'src/team/entities/team.entity';
import { MatchService } from 'src/match/match.service';
import { Match } from 'src/match/entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament,Category, Fixture, Round, Team, Match])],
  controllers: [TournamentController],
  providers: [TournamentService, FixtureService, MatchService],
  exports: [TournamentService]
})
export class TournamentModule {}
