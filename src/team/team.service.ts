import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TeamDto } from './dto/team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { TournamentService } from 'src/tournament/tournament.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @Inject()
    private tournamentService: TournamentService,
    @InjectRepository(User)
    private userService: Repository<User>,
  ) {}
  async newTeam(tournamentId: string, TeamDto: TeamDto) {
    const tournament = await this.tournamentService.getTournament(tournamentId);
    for (const user of TeamDto.players) {
      const users = await this.userService.findOne({ where: { id: user.id } });
      const userHaveTeam = users.team;
      if (userHaveTeam) {
        throw new BadRequestException(
          'El usuario solo puede pertenecer a un equipo',
        );
      } else {
        const team = {
          name: TeamDto.name,
          category: tournament.category,
          user: TeamDto.players,
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
}
