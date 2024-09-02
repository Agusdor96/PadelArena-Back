import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { Team } from 'src/team/entities/team.entity';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
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

  async createMatch({ teams, tournament, currentHour, dayIndex }) {
    const {startingTime, finishTime, matchDuration, courtsAvailable, playingDay, startDate} = tournament;
    const [team1, team2] = teams;

    const timeZone = 'America/Argentina/Buenos_Aires';
    const matchStartTime = format(currentHour, 'HH:mm', { timeZone });
    console.log("matchStartTime", matchStartTime);
    
    const openingTime = new Date(startingTime).getHours(); // 7
    const closeTime = new Date(finishTime); // 14
    // const availableHoursForPlaying = closeTime - openingTime // 7
    // const matchesPerHour = courtsAvailable / (matchDuration / 60) // 2
    // const matchesPerDay = availableHoursForPlaying * matchesPerHour // 14
    // const matchesAtSameTime = courtsAvailable // 2
    // const matchDurationHour = matchDuration / 60 // 1
    
    const newMatch = {
      tournament,
        teams: [team1, team2],
        date: playingDay[dayIndex],
        time: matchStartTime,
      };
      console.log(newMatch.date);
      
      console.log("time:", newMatch.time);
      
    const savedMatch = await this.matchRepository.save(newMatch)
    return savedMatch
      
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
