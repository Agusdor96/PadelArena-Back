import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Tournament } from 'src/tournament/entities/tournament.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Tournament])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
