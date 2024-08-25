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
    const qTeams = tournament.team.length + 1;
    const teamsArray = tournament.team.sort((team)=> team.order)
    if(qTeams === 16 || qTeams === 32 || qTeams === 64){
        if(tournamentHasClosedInscription === 'cerradas'){
          for (let i = 1; i < teamsArray.length + 1; i += 2) {
            
            const teams = [teamsArray[i], teamsArray[i-1]];
            teams.push()
            const date = tournament.startDate;
            const time = tournament.startingTime;

            console.log(date);
            console.log(time);
            console.log(teams);
            
            // await this.matchService.createMatch(date,time,teams)
          }
          }
      }else {
        throw new BadRequestException('El torneo no puede cerrarse ya que no cumple con la cantidad de equipos')
      }
      }
    }


