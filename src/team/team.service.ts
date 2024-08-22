import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { Tournament } from 'src/tournament/entities/tournament.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository:Repository<Team>,
    @InjectRepository(Tournament) private tournamentRespository:Repository<Tournament>, 
  ){}

  create(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team';
  }

  async getTeamsFromTournament(tournamentId: string):Promise<Team[]>{
    const tournament = await this.tournamentRespository.findOne({
      where: {
        id:tournamentId
      },
      relations: ["team"]
    })

    if(!tournament){
      throw new NotFoundException("No se encontro el torneo")
    }
    if(!tournament.team.length){
      throw new NotFoundException("No hay equipos inscriptos en el torneo")
    }
      
      return tournament.team;
  }

  async getOneTeamFromTournament(teamId: string, tournamentId:string):Promise<Team> {
    const team = await this.teamRepository.findOne({
      where: {
        id:teamId,
        tournament: {id:tournamentId}
      }
    })

    if(!team){
      throw new NotFoundException("No se encontro equipo con el id proporcionado")
    }
    
      return team;
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
