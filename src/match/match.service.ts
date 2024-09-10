import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { Team } from '../team/entities/team.entity';
import { TournamentEntity } from '../tournament/entities/tournament.entity';
import { format } from 'date-fns-tz';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match) private matchRepository: Repository<Match>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    @InjectRepository(TournamentEntity)
    private tournamentRepository :Repository<TournamentEntity>,
  //   @Inject() private tournamentService: TournamentService,
  ) {}

  async createMatch({ teams, tournament, currentMatchTime, currentDayIndex }) {
    const {playingDay} = tournament;
    const [team1, team2] = teams;

    const timeZone = 'America/Argentina/Buenos_Aires';
    const matchStartTime = format(currentMatchTime, 'HH:mm', { timeZone });

    const newMatch = {
      tournament,
        teams: [team1, team2],
        date: playingDay[currentDayIndex],
        time: matchStartTime,
      };

    const savedMatch = await this.matchRepository.save(newMatch)
    return savedMatch
      
  }

  async getAllMatchesFromTournament(tournamentId: string) {
    const tournament = await this.tournamentRepository.findOne({where: {id: tournamentId},relations:{matches:true}})
    if(!tournament) throw new NotFoundException("No se encuentra torneo por el id proporcionado")
    
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
