import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TournamentEntity } from './entities/tournament.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../category/entities/category.entity';
import { Fixture } from '../fixture/entities/fixture.entity';
import { FixtureService } from '../fixture/fixture.service';
import { Round } from '../fixture/entities/round.entity';
import { Team } from '../team/entities/team.entity';
import { MatchService } from '../match/match.service';
import { Match } from '../match/entities/match.entity';
import { PlayerStadisticsService } from '../player-stadistics/player-stadistics.service';
import { PlayerStadistic } from '../player-stadistics/entities/player-stadistic.entity';
import { User } from '../user/entities/user.entity';
import { FileService } from '../file/file.service';
import { FileModule } from '../file/file.module';
import { FileRepository } from '../file/file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentEntity,Category, Fixture, Round, Team, Match, PlayerStadistic, User]), FileModule],
  controllers: [TournamentController],
  providers: [TournamentService, FixtureService, MatchService, PlayerStadisticsService, FileService, FileRepository],
  exports: [TournamentService]
})
export class TournamentModule {}
