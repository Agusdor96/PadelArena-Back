import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';
import { Repository } from 'typeorm';
import { Fixture } from './entities/fixture.entity';
import { Round } from './entities/round.entity';
import { MatchService } from 'src/match/match.service';
import { Match } from 'src/match/entities/match.entity';

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
  ) {}
  async createFixture(tournamentID: string) {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentID },
      relations: { team: true, matches: true, fixture: true, category: true },
    });
    const tournamentHasClosedInscription = tournament.inscription;
    if (tournamentHasClosedInscription === 'cerradas') {
        const round = await this.createRound(tournament)
        const fixture = new Fixture()
        const newFixture = await this.fixtureRepository.save(fixture)

        await this.tournamentRepository.update(tournament.id, {fixture: fixture})

        await this.roundRepository.update(round.id, {fixture: fixture})

        return { message: 'Fixture creado con exito', newFixture };
      } else {
      throw new BadRequestException(
        'El torneo no puede cerrarse ya que no cumple con la cantidad de equipos',
      );
    }
  }

  async uploadWinners (matchId: string, winnerId: string) {
    const match = await this.matchRepository.findOne({where: {id:matchId}, relations: {teams:true}})
    const teamsIds = match.teams.map(team => team.id)
    const teamIdInMatch = teamsIds.includes(winnerId)
    if(match){
      if(teamIdInMatch) {
        await this.matchRepository.update(matchId, {teamWinner: winnerId})
        const round = await this.roundRepository.findOne({where: {id: match.round.id}})
        if(round.stage === 'final') {
          return {message: 'Final definida', winner: winnerId}
        }else {
          const allMatchesFromThatRound = round.matches
          const notAllMatchesHasWinner = allMatchesFromThatRound.map(match => {
            const hasWinner = match.teamWinner
            if(hasWinner.length){
              return true
            }else return false
          }).includes(false)
          if(notAllMatchesHasWinner){
            return {message: 'Partido definido con exito'}
          }else {
            await this.createRound(match.tournament)
          }
        }
        
      } else {
        throw new BadRequestException('El equipo debe pertenecer al partido para poder ganarlo')
      }
    }else {
      throw new NotFoundException('No fue posible encontrar el partido')
    }
    
    
  }
  async createRound (tournament: TournamentEntity) {
    const qTeams = tournament.team.length;
    const teamsArray = tournament.team.sort((team) => team.order);
    const qteamsArray = [2, 4, 8, 16, 32, 64]
    const includerVerify = qteamsArray.includes(qTeams)
    if (includerVerify) {
      let stage = ''
          switch(qTeams) {
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
      
        const newRound = new Round();
        newRound.stage = stage;
        newRound.matches = matches;
        const round = await this.roundRepository.save(newRound);
        return round
      }else {
          throw new BadRequestException(
            'Las inscripciones de este torneo deben estar cerradas',
          );
        }
  }
}
