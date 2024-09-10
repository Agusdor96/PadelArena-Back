import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Team } from 'src/team/entities/team.entity';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Match, Team, TournamentEntity])],
  controllers: [MatchController],
  providers: [MatchService],
  exports:[MatchService]
})
export class MatchModule {}
