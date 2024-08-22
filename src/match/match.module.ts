import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { TournamentService } from 'src/tournament/tournament.service';

@Module({
  imports:[TypeOrmModule.forFeature([Match])],
  controllers: [MatchController],
  providers: [MatchService, TournamentService],
})
export class MatchModule {}
