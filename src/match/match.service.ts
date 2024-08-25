import { Injectable, NotFoundException } from '@nestjs/common';
import { MatchDto } from './dto/match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { Team } from 'src/team/entities/team.entity';
import { Tournament } from 'src/tournament/entities/tournament.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match) private matchRepository: Repository<Match>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    @InjectRepository(Tournament)
    private tournamentRepository :Repository<Tournament>,
  //   @Inject() private tournamentService: TournamentService,
  ) {}

  async createMatch(createMatchDto: MatchDto) {
    const teamEntity = createMatchDto.teams;

    for (const teamName of teamEntity) {
      const teams = await this.teamRepository.find({
        where: {
          name: teamName.name,
        },
      });

      if (!teams.length) {
        throw new NotFoundException(
          'No se encontraron equipos con esos nombres',
        );
      } else {
        const newMatch = {
          date: createMatchDto.date,
          time: createMatchDto.time,
          teams: createMatchDto.teams,
        };
        return await this.matchRepository.save(newMatch);
      }
    }
  }

  async getAllMatchesFromTournament(tournamentId: string) {
    const tournament = await this.tournamentRepository.findOne({where: {id: tournamentId}})
    // const tournament = await this.tournamentService.getTournament(tournamentId);
    const matches = tournament.matches;

    if (!matches.length) {
      throw new NotFoundException(
        'No se encontraron partidos asociados a este torneo',
      );
    }
    return matches;
  }

  async getOneMatch(teamId: string) {
    const match = await this.matchRepository.findOneBy({ id: teamId });
    if (!match) {
      throw new NotFoundException(
        'No se encontro ningun partido con el id proporcionado',
      );
    }

    return match;
  }
}
