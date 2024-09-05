import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { Repository } from 'typeorm';
import { Fixture } from './entities/fixture.entity';
import { Round } from './entities/round.entity';
import { MatchService } from 'src/match/match.service';
import { Match } from 'src/match/entities/match.entity';
import { PlayerStadisticsService } from 'src/player-stadistics/player-stadistics.service';
// import { DateTime } from 'luxon';
import { setHours, addDays, getMinutes, getHours, parse, addMinutes, setMinutes } from 'date-fns';
import { toZonedTime, format } from 'date-fns-tz';
import { Team } from 'src/team/entities/team.entity';
import { StatusEnum } from 'src/tournament/tournament.enum';


@Injectable()
export class FixtureService {
  constructor(
    @InjectRepository(TournamentEntity)
    private tournamentRepository: Repository<TournamentEntity>,
    @InjectRepository(Fixture)
    private fixtureRepository: Repository<Fixture>,
    @InjectRepository(Round)
    private roundRepository: Repository<Round>,
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @Inject()
    private matchService: MatchService,
    @Inject()
    private playerStatsService: PlayerStadisticsService,
  ) {}
  async createFixture(tournamentID: string) {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentID },
      relations: { team: true, matches: true, fixture: true, category: true },
    });

    if(tournament.inscription !== 'cerradas') throw new BadRequestException('Las inscripciones de este torneo deben estar cerradas');

      const round = await this.createRound(tournamentID);
      const fixture = new Fixture();
      const newFixture = await this.fixtureRepository.save(fixture);

      await this.tournamentRepository.update(tournament.id, {
        fixture: fixture,
      });

      await this.roundRepository.update(round.id, { fixture: fixture });
      return { message: 'Fixture creado con exito', newFixture };
    
  }

  async createRound(tournamentID: string) {
    const tournament = await this.tournamentRepository.findOne({
        where: { id: tournamentID },
        relations: { team: true, matches: true, fixture: true, category: true },
    });

    const teamsByOrder:Team[] = tournament.team.sort((team) => team.order);
    const availableTeams: Team[] = teamsByOrder.filter((team) => team.ableForPlay === true);
    const validTeamSizes: number[] = [ 2, 4, 8, 16, 32, 64];
    const isValidTeamCount:boolean = validTeamSizes.includes(availableTeams.length);

    if(!isValidTeamCount) throw new BadRequestException("Cantidad de equipos invalida para crear la ronda")

    let stage = '';
    switch (availableTeams.length) {
            case 2: stage = 'final'; break;
            case 4: stage = 'semifinal'; break;
            case 8: stage = 'cuartos'; break;
            case 16: stage = 'octavos'; break;
            case 32: stage = 'ronda de 16'; break;
            case 64: stage = 'fase de grupos'; break;
            default: stage = 'Ronda no válida';
    }

    const { startingTime, matchDuration, courtsAvailable, finishTime, playingDay} = tournament;
    let {currentDay, matchStartTime} = tournament

    const dailyStartHour: Date = parse(startingTime, 'HH:mm', new Date());
    const dailyEndHour: Date = parse(finishTime, 'HH:mm', new Date());
    let currentMatchTime: Date = matchStartTime 
      ? parse(matchStartTime, 'HH:mm', new Date())
      : dailyStartHour;
    
    const closingHour: number = getHours(dailyEndHour);
    
    const simultaneousMatches = courtsAvailable;
    let teamIndex = 0; 
    let currentDayIndex = currentDay;
    
    while (teamIndex < availableTeams.length) {
      for (let i = 0; i < simultaneousMatches && teamIndex < availableTeams.length; i++) {
        if (teamIndex + 1 < availableTeams.length) {  

          const matchHourDecimal = getHours(currentMatchTime) + getMinutes(currentMatchTime) / 60;          
          const closingHourDecimal = closingHour + getMinutes(closingHour) / 60;
          if(matchHourDecimal >= closingHourDecimal){
            
            currentDayIndex ++;
            currentMatchTime = parse(format(dailyStartHour, 'HH:mm'), 'HH:mm', new Date());

            if(currentDayIndex >= playingDay.length){
              currentDayIndex = 0;
            }
          }
          const teams = [availableTeams[teamIndex], availableTeams[teamIndex + 1]];
          await this.matchService.createMatch({
            teams,
            tournament,
            currentMatchTime,
            currentDayIndex
          });
          teamIndex += 2; 
        }
      }
      currentMatchTime = addMinutes(currentMatchTime, matchDuration);      
    }

    const formattedCurrentHour = format(currentMatchTime, 'HH:mm');
    await this.tournamentRepository.update(tournamentID, { matchStartTime: formattedCurrentHour, currentDay: currentDayIndex});

    const matches = await this.matchRepository.find({where:{tournament:{id:tournamentID}}, relations:["teamWinner"]})
    const matchesNotPlayed = matches.filter((match) => match.teamWinner === null);
    const newRound = new Round();
    newRound.stage = stage;
    newRound.matches = matchesNotPlayed;
          
    if (!tournament.fixture) {
      const round = await this.roundRepository.save(newRound);
      return round;
    }
          
    newRound.fixture = tournament.fixture;
    const round = await this.roundRepository.save(newRound);
    const returnRound = await this.roundRepository.findOne({where:{id:round.id}, relations:{matches:{teams:true, teamWinner:true}}})
    return returnRound;     
  }

  async uploadWinners({ matchId }, winnerId: string) {
    const match = await this.matchRepository.findOne({
      where: { id: matchId },
      relations: { teams: { user: true }, round: true, tournament: true },
    });
    if (!match) throw new NotFoundException('No fue posible encontrar el partido');

    const teamsIds = match.teams.map((team) => team.id);
    const teamIdInMatch = teamsIds.includes(winnerId);
    if (!teamIdInMatch) throw new BadRequestException('El equipo debe pertenecer al partido para poder ganarlo');
    
    const winnerTeam: Team = await this.teamRepository.findOne({where:{id:winnerId}})
    match.teamWinner = winnerTeam

    await this.matchRepository.save(match);
    await this.playerStatsService.addStats(teamsIds, winnerId);

    const round = await this.roundRepository.findOne({
      where: { id: match.round.id },
      relations: { matches: {teamWinner:true}
      },
    });

    if(!winnerTeam)throw new NotFoundException("No se pudo encontrar al equipo ganador")
    const tournamentFromMatch = match.tournament.id

    if (round.stage === 'final') {
      await this.tournamentRepository.update(tournamentFromMatch, {status:StatusEnum.FINISHED})
      return { message: 'Final definida', winner: winnerTeam};
    } 

    const allMatchesFromThatRound = round.matches;
    const allMatchesHaveWinners = allMatchesFromThatRound.every((match) => match.teamWinner !== null);
        
    const fixture = await this.fixtureRepository.findOne({
      where: {id:round.fixture.id},
      relations: {round: {matches: {teams:true, teamWinner:true}}}
    })
    
    if (!allMatchesHaveWinners) {
      return { fixture };
    } 
      return await this.createRound(tournamentFromMatch);
  }

  async getOneFixture(fixtureId: string) {
    const fixture = await this.fixtureRepository.findOne({
      where: {id:fixtureId},
      relations: {round: {matches: {teams:true, teamWinner:true}}}
    })
    if(!fixture) throw new NotFoundException("El torneo no tiene un fixture asociado o No se encuentra fixture con el id proporcionado")
  
    return fixture;  
  }
}