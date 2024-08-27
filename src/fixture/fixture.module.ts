import { Module } from '@nestjs/common';
import { FixtureService } from './fixture.service';
import { FixtureController } from './fixture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { Fixture } from './entities/fixture.entity';
import { Round } from './entities/round.entity';
import { MatchService } from 'src/match/match.service';
import { Match } from 'src/match/entities/match.entity';
import { Team } from 'src/team/entities/team.entity';
import { PlayerStadisticsService } from 'src/player-stadistics/player-stadistics.service';
import { PlayerStadistic } from 'src/player-stadistics/entities/player-stadistic.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentEntity, Fixture, Round, Match, Team, PlayerStadistic, User])],
  controllers: [FixtureController],
  providers: [FixtureService, MatchService, PlayerStadisticsService],
  exports:[FixtureService]
})
export class FixtureModule {}
