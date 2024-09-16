import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TournamentService } from '../tournament/tournament.service';
import { TournamentEntity } from '../tournament/entities/tournament.entity';
import { User } from '../user/entities/user.entity';
import { Category } from '../category/entities/category.entity';
import { FixtureService } from '../fixture/fixture.service';
import { Fixture } from '../fixture/entities/fixture.entity';
import { Round } from '../fixture/entities/round.entity';
import { MatchService } from '../match/match.service';
import { Match } from '../match/entities/match.entity';
import { PlayerStadisticsService } from '../player-stadistics/player-stadistics.service';
import { PlayerStadistic } from '../player-stadistics/entities/player-stadistic.entity';
import { FileService } from '../file/file.service';
import { FileModule } from '../file/file.module';
import { FileRepository } from '../file/file.repository';
import { PaymentDetail } from '../mercado-pago/entities/paymentDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, TournamentEntity, User, Category, Fixture, Round, Match, PlayerStadistic, PaymentDetail]), FileModule],
  controllers: [TeamController],
  providers: [TeamService, TournamentService, FixtureService, MatchService, PlayerStadisticsService, FileService, FileRepository],
  exports:[TeamService]
})
export class TeamModule {}
