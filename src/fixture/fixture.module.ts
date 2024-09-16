import { Module } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { FixtureController } from './fixture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentEntity } from '../tournament/entities/tournament.entity';
import { Fixture } from './entities/fixture.entity';
import { Round } from './entities/round.entity';
import { MatchService } from '../match/match.service';
import { Match } from '../match/entities/match.entity';
import { Team } from '../team/entities/team.entity';
import { PlayerStadisticsService } from '../player-stadistics/player-stadistics.service';
import { PlayerStadistic } from '../player-stadistics/entities/player-stadistic.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentEntity, Fixture, Round, Match, Team, PlayerStadistic, User])],
  controllers: [FixtureController],
  providers: [FixtureService, MatchService, PlayerStadisticsService],
  exports:[FixtureService]
})
export class FixtureModule {}
