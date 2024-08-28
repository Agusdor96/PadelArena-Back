import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TournamentEntity } from './entities/tournament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { Fixture } from 'src/fixture/entities/fixture.entity';
import { FixtureService } from 'src/fixture/fixture.service';
import { Round } from 'src/fixture/entities/round.entity';
import { Team } from 'src/team/entities/team.entity';
import { MatchService } from 'src/match/match.service';
import { Match } from 'src/match/entities/match.entity';
import { PlayerStadisticsService } from 'src/player-stadistics/player-stadistics.service';
import { PlayerStadistic } from 'src/player-stadistics/entities/player-stadistic.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentEntity,Category, Fixture, Round, Team, Match, PlayerStadistic, User])],
  controllers: [TournamentController],
  providers: [TournamentService, FixtureService, MatchService, PlayerStadisticsService],
  exports: [TournamentService]
})
export class TournamentModule {}
