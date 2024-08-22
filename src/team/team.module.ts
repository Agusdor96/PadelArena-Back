import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TournamentService } from 'src/tournament/tournament.service';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Tournament, Category])],
  controllers: [TeamController],
  providers: [TeamService, TournamentService],
})
export class TeamModule {}
