import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TeamDto } from './dto/team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { In, Repository } from 'typeorm';
import { TournamentService } from 'src/tournament/tournament.service';
import { User } from 'src/user/entities/user.entity';
import * as data from '../seed/team.json';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { StatusEnum } from 'src/tournament/tournament.enum';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @Inject()
    private tournamentService: TournamentService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}
  async newTeam(tournamentId: string, TeamDto: TeamDto) {
    const tournament = await this.tournamentRepository.findOne({where: {id:tournamentId},relations:{category:true}})
    
    const players = await this.userRepository.find({
      where: { id: In(TeamDto.players) },
    });
    
    if (tournament.inscription === 'abiertas') {
      const tournaments = await this.tournamentRepository.find({
        where: { status: StatusEnum.PENDING || StatusEnum.IN_PROGRESS },
        relations: { team: true },
      });
      
      const tournamentMapped = tournaments.map((tournament) =>
        tournament.team.some((team)=> players.includes(team.user[0]) || players.includes(team.user[1]))
        
      );
      

      const isTeamOnActiveTournament = tournamentMapped.includes(true)
      if (isTeamOnActiveTournament) {
        throw new BadRequestException(
          'El jugador ya se encuentra inscripto a un torneo pendiente o en progreso');
      }
      if (!players) {
        throw new BadRequestException('Jugadores no encontrados');
      } else {
        const teams = await this.teamRepository.find();
        const team = {
          name: TeamDto.name,
          category: tournament.category,
          user: players,
          tournament: tournament,
          order: teams.length,
        };
        await this.teamRepository.save(team);
        return { message: 'Equipo creado con exito', team };
      }
    }else{
      throw new BadRequestException('Este torneo ya no se encuentra con sus incripciones abiertas')
    }
  }

  async findOneTeam(id: string) {
    const team = await this.teamRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!team) {
      throw new NotFoundException(
        'El equipo no existe, revisa la informacion proporcionada',
      );
    } else {
      return team;
    }
  }

  async findAllTeamsByTournament(tournamentId: string) {
    const tournament = await this.tournamentService.getTournament(tournamentId);
    if (!tournament.team.length) {
      throw new NotFoundException(
        'No se encontraron equipos inscriptos en este torneo.',
      );
    } else {
      return tournament.team;
    }
  }

  async preload() {
    let orderTeam = 0;
    const users = await this.userRepository.find();
    for (let i = 1; i < users.length + 1; i += 2) {
      const teamIndex = (i - 1) / 2;
      if (teamIndex < data.length) {
        const teamExist = await this.teamRepository.findOne({
          where: { name: data[teamIndex].name },
          relations: { user: true },
        });
        if (!teamExist) {
          data[teamIndex].user = [users[i - 1], users[i]];
          data[teamIndex].order = orderTeam;
          orderTeam++;
          await this.teamRepository.save(data[teamIndex]);
        }
      }
    }
    return { message: 'Equipos precargados correctamente' };
  }
}
