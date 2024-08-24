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
import { skipLast } from 'rxjs';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @Inject()
    private tournamentService: TournamentService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async newTeam(tournamentId: string, TeamDto: TeamDto) {
    const tournament = await this.tournamentService.getTournament(tournamentId);
    const players = await this.userRepository.find({
      where: { id: In(TeamDto.players) },
    });
    for (const user of TeamDto.players) {
      const users = await this.userRepository.findOne({ where: { id: user } });
      const userHaveTeam = users.team;
      if (userHaveTeam) {
        throw new BadRequestException(
          'El usuario solo puede pertenecer a un equipo',
        );
      } else {
        const team = {
          name: TeamDto.name,
          category: tournament.category,
          user: players,
          tournament: tournament,
        };
        await this.teamRepository.save(team);
        return { message: 'Equipo creado con exito', team };
      }
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
    const user = await this.userRepository.find();
    for (const team of data) {
      const exist = await this.teamRepository.findOne({
        where: { name: team.name },
      });

      for (let i = 0; i <= user.length; i += 1) {
        const slicedPlayers = user.slice(i, i + 2);
        const newTeam = {
          name: team.name,
          players: slicedPlayers,
        };
        if (!exist) {
          await this.teamRepository.save(newTeam);
        } else {
          continue;
        }
      }
    }
    return { message: 'Equipos precargados correctamente' };
  }
}

// const newTeam = new Team()
// newTeam.name = team.name;
// newTeam.user[0] = user[contador];
// newTeam.user[1] = user[contador+1];

// await this.teamRepository.save(newTeam);
// contador +=2;
