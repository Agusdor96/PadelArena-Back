import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TournamentService } from 'src/tournament/tournament.service';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { FixtureService } from 'src/fixture/fixture.service';
import { Fixture } from 'src/fixture/entities/fixture.entity';
import { Round } from 'src/fixture/entities/round.entity';
import { MatchService } from 'src/match/match.service';
import { Match } from 'src/match/entities/match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, TournamentEntity, User, Category, Fixture, Round, Match])],
  controllers: [TeamController],
  providers: [TeamService, TournamentService, FixtureService, MatchService],
  exports:[TeamService]
})
export class TeamModule {}
