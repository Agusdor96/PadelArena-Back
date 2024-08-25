import { BadRequestException, Injectable } from '@nestjs/common';
import { FixtureDto } from './dto/fixture.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { Repository } from 'typeorm';
import { Fixture } from './entities/fixture.entity';
import { Round } from './entities/round.entity';

@Injectable()
export class FixtureService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    @InjectRepository(Fixture)
    private fixtureRepository: Repository<Fixture>,
    @InjectRepository(Round)
    private roundRepository: Repository<Round>,
  ) {}
  async createFixture(
    id: string,
    FixtureDto?: FixtureDto,
  ) {
    
    const tournament = await this.tournamentRepository.findOne({where:{id}})
    console.log(tournament);
    
    const tournamentHasClosedInscription = 'cerradas'//tournament.inscription 
    
    if(tournament){
      const qTeams = tournament.team.length + 1;
      const teamsArray = tournament.team
      if(qTeams === 16 || qTeams === 32 || qTeams === 64){
        if(tournament.team.length){
          if(tournamentHasClosedInscription === 'cerradas'){
          
          }
        }
      }else {
        throw new BadRequestException('El torneo no puede cerrarse ya que no cumple con la cantidad de equipos')
      }
      }
    }
  }


