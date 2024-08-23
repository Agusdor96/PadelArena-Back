import { Injectable } from '@nestjs/common';
import { CreateFixtureDto } from './dto/fixture.dto';
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
    tournamentId: string,
    createFixtureDto: CreateFixtureDto,
  ) {
    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
      relations: { category: true, team: true },
    });
    if(tournament){
      if(tournament.team.length){
        const qTeams = tournament.team.length;
        //ponemos una pausa aca para acomodarnos
      }
    }
  }


}