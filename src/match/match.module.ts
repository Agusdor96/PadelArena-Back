import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { TournamentService } from 'src/tournament/tournament.service';
import { Category } from 'src/category/entities/category.entity';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { TournamentModule } from 'src/tournament/tournament.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Match, Tournament, Category])],
  controllers: [MatchController],
  providers: [MatchService, TournamentService],
})
export class MatchModule {}
