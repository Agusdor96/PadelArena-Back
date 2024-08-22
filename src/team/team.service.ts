import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TeamDto } from './dto/team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { TournamentService } from 'src/tournament/tournament.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @Inject()
    private tournamentService: TournamentService
  ){}
  newTeam(tournamentId:string ,TeamDto: TeamDto) {
    return 'This action adds a new team';
  }

  async findOneTeam(id: string) {
    const team = await this.teamRepository.findOne({where: {id}})

    if(!team){
      throw new NotFoundException('El equipo no existe, revisa la informacion proporcionada')
    }else {
      
    }
    
  }

  async findAllTeamsByTournament(tournamentId: string) {
    const tournament = await this.tournamentService.getTournament(tournamentId)
  }
}
