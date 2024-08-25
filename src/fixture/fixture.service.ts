import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { Repository } from 'typeorm';
import { Fixture } from './entities/fixture.entity';
import { Round } from './entities/round.entity';
import { MatchService } from 'src/match/match.service';

@Injectable()
export class FixtureService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    @InjectRepository(Fixture)
    private fixtureRepository: Repository<Fixture>,
    @InjectRepository(Round)
    private roundRepository: Repository<Round>,
    @Inject()
    private matchService: MatchService
  ) {}
  async createFixture(
    tournament: Tournament,
  ) {
    const tournamentHasClosedInscription = tournament.inscription 
    const qTeams = tournament.team.length;
    console.log(qTeams);
    
    const teamsArray = tournament.team.sort((team)=> team.order)
    if(qTeams === 2 || qTeams === 16 || qTeams === 32 || qTeams === 64){
        if(tournamentHasClosedInscription === 'cerradas'){
          const stage = 
          qTeams === 2 ? 'final' :
          qTeams === 16 ? 'octavos' :
          qTeams === 32 ? 'dieciseisavos' :
          qTeams === 64 ? 'treintaidosavos' : '';
          for (let i = 1; i < teamsArray.length + 1; i += 2) {
            const teams = [teamsArray[i-1], teamsArray[i]];
            const date = tournament.startDate;
            const time = tournament.startingTime;
            await this.matchService.createMatch({date, time, teams, tournament})
          }
            const matches = await this.matchService.getAllMatchesFromTournament(tournament.id)
            const newRound = new Round();
            newRound.stage = stage;
            newRound.matches = matches;
            console.log(newRound);
            
            const initialRound = await this.roundRepository.save(newRound);

            const fixture = {
              tournament: tournament,
              round: [initialRound]
            }
            const newFixture = await this.fixtureRepository.save(fixture)
            return {message: 'Fixture creado con exito', newFixture}
          }
      }else {
        throw new BadRequestException('El torneo no puede cerrarse ya que no cumple con la cantidad de equipos')
      }
      }
    }


