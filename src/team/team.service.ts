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
  async newTeam(tournamentId:string ,TeamDto: TeamDto) {
    const tournament = await this.tournamentService.getTournament(tournamentId)
    if(!tournament){
      throw new NotFoundException('El equipo no existe, revisa la informacion proporcionada')
    }else {
      const team = {
        name: TeamDto.name,
        category: tournament.category,
        user: TeamDto.players,
        tournament: tournament
      }
      await this.teamRepository.save(team)
      return {message: 'Equipo creado con exito', team}
    }
  }

  async findOneTeam(id: string) {
    const team = await this.teamRepository.findOne({where: {id}, relations: {category:true}})
    if(!team){
      throw new NotFoundException('El equipo no existe, revisa la informacion proporcionada')
    }else {
      return team
    }
  }

  async findAllTeamsByTournament(tournamentId: string) {
    const tournament = await this.tournamentService.getTournament(tournamentId)
    if (!tournament.team.length){
      throw new NotFoundException('No se encontraron equipos inscriptos en este torneo.')
    }
    else {
      return tournament.team
    }
  }
}
