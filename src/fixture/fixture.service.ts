import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { Repository } from 'typeorm';
import { Fixture } from './entities/fixture.entity';
import { Round } from './entities/round.entity';
import { MatchService } from 'src/match/match.service';
import { Match } from 'src/match/entities/match.entity';
import { PlayerStadisticsService } from 'src/player-stadistics/player-stadistics.service';


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
    @Inject()
    private matchService: MatchService,
    @Inject()
    private playerStatsService: PlayerStadisticsService
  ) {}
  async createFixture(tournamentID: string) {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentID },
      relations: { team: true, matches: true, fixture: true, category: true },
    });

    const tournamentHasClosedInscription = tournament.inscription;
    if (tournamentHasClosedInscription === 'cerradas') {
        const round = await this.createRound(tournamentID)
        const fixture = new Fixture()
        const newFixture = await this.fixtureRepository.save(fixture)

        await this.tournamentRepository.update(tournament.id, {fixture: fixture})

        await this.roundRepository.update(round.id, {fixture: fixture})

        return { message: 'Fixture creado con exito', newFixture };
      } else {
      throw new BadRequestException(
        'Las inscripciones de este torneo deben estar cerradas',
      );
    }
  }

  async uploadWinners ({matchId}, winnerId: string) {
    const match = await this.matchRepository.findOne({where: {id:matchId}, relations: {teams: {user:true}, round: true, tournament:true}})
    const teamsIds = match.teams.map(team => team.id)
    const teamIdInMatch = teamsIds.includes(winnerId)
    if(match){
      if(teamIdInMatch) {
        await this.matchRepository.update(matchId, {teamWinner: winnerId})
        await this.playerStatsService.addStats(teamsIds, winnerId)
        
        const round = await this.roundRepository.findOne({where: {id: match.round.id},relations: {matches:true}})
        
        if(round.stage === 'final') {
          return {message: 'Final definida', winner: winnerId}
        }else {
          const allMatchesFromThatRound = round.matches
          const notAllMatchesHasWinner = allMatchesFromThatRound.map(match => {
            const hasWinner = match.teamWinner
            if(hasWinner !== null){
              return true
            }else return false
          }).includes(false)
          
          if(notAllMatchesHasWinner){
            return {message: 'Partido definido con exito'}
          }else {            
            return await this.createRound(match.tournament.id)
          }
        }
        
      } else {
        throw new BadRequestException('El equipo debe pertenecer al partido para poder ganarlo')
      }
    }else {
      throw new NotFoundException('No fue posible encontrar el partido')
    }

  }

  async createRound (tournamentID: string) {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentID },
      relations: { team: true, matches: true, fixture: true, category: true },
    });
    
    const allTeamsArray = tournament.team.sort(team => team.order)
    
    const teamsArray = allTeamsArray.filter(team => team.ableForPlay === true)
    const qteamsArray = [2, 4, 8, 16, 32, 64]
    const includerVerify = qteamsArray.includes(teamsArray.length)
    
    if (includerVerify) {
      let stage = ''
          switch(teamsArray.length) {
            case 2:
              stage = 'final'
              break
            case 4: 
              stage = 'semifinal'
              break
            case 8: 
              stage = 'cuartos'
              break
            case 16: 
              stage = 'octavos'
                break
            case 32: 
              stage = 'final'
              break
            case 64: 
              stage = 'final'
              break
            default:
              stage = 'Ronda no valida'
          }
          
        for (let i = 1; i < teamsArray.length + 1; i += 2) {
          if (i < teamsArray.length) {
            const teams = [teamsArray[i - 1], teamsArray[i]];
            const date = tournament.startDate;
            const time = tournament.startingTime;
            await this.matchService.createMatch({
              date,
              time,
              teams,
              tournament,
            });
          }
        }
        const matches = await this.matchService.getAllMatchesFromTournament(
          tournament.id,
        );
        const matchesNotPlayed = matches.filter(match => match.teamWinner === null)
        const newRound = new Round();
        newRound.stage = stage;
        newRound.matches = matchesNotPlayed;
        if(!tournament.fixture) {
          const round = await this.roundRepository.save(newRound);
          return round
        }
        newRound.fixture = tournament.fixture
        const round = await this.roundRepository.save(newRound);
        return round
      }else {
          throw new BadRequestException(
            'El torneo no puede cerrarse ya que no cumple con la cantidad de equipos',
          );
        }
  }
}
