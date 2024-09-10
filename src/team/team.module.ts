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
import { PlayerStadisticsService } from 'src/player-stadistics/player-stadistics.service';
import { PlayerStadistic } from 'src/player-stadistics/entities/player-stadistic.entity';
import { FileService } from 'src/file/file.service';
import { FileModule } from 'src/file/file.module';
import { FileRepository } from 'src/file/file.repository';
import { PaymentDetail } from 'src/mercado-pago/entities/paymentDetail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, TournamentEntity, User, Category, Fixture, Round, Match, PlayerStadistic, PaymentDetail]), FileModule],
  controllers: [TeamController],
  providers: [TeamService, TournamentService, FixtureService, MatchService, PlayerStadisticsService, FileService, FileRepository],
  exports:[TeamService]
})
export class TeamModule {}
