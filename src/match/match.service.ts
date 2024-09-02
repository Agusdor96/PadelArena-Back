import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { Team } from 'src/team/entities/team.entity';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match) private matchRepository: Repository<Match>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    @InjectRepository(TournamentEntity)
    private tournamentRepository :Repository<TournamentEntity>,
  //   @Inject() private tournamentService: TournamentService,
  ) {}

  async createMatch({ teams, tournament}) {
    
    for (const teamName of teams) {
      const teamsFinder = await this.teamRepository.findOne({
        where: {
          name: teamName.name,
        },
      })
      if (!teamsFinder) {
        throw new NotFoundException('No se encontró un equipo con el nombre: ',
        teamName.name)
      }
    }
      const newMatch = {
          tournament
        };
        const match = await this.matchRepository.save(newMatch);
        match.teams = [teams[0], teams[1]]
        await this.matchRepository.save(match)
        return match
      
    
  }

  async getAllMatchesFromTournament(tournamentId: string) {
    const tournament = await this.tournamentRepository.findOne({where: {id: tournamentId},relations:{matches:true}})
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
