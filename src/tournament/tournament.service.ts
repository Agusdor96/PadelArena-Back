import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentService {
constructor(
  @InjectRepository(Tournament) private tournamentRepository: Repository<Tournament>,
){}


  async create(createTournamentDto: CreateTournamentDto) {
    const exist = await this.tournamentRepository.findOne({where: {name: createTournamentDto.name}});
    if (exist && exist.status) throw new BadRequestException('Tournament already exists');

    if(createTournamentDto.teamsQuantity % 2 != 0 || createTournamentDto.teamsQuantity < 16 ) throw new BadRequestException("Team quantity cant be odd or less than 16");
    
      const InitialMatches = createTournamentDto.teamsQuantity /2;

      const startTime = new Date(createTournamentDto.startTime);

       const endTime = new Date(createTournamentDto.endTime);

      const availableHoursPerDay = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      
      const matchesPerDay = (availableHoursPerDay / (createTournamentDto.matchDuration / 60)) * createTournamentDto.courts;

      let qPartidosRonda = InitialMatches;
      let totalPartidos = 0;
      while(qPartidosRonda > 1 ){
        totalPartidos += qPartidosRonda;
        qPartidosRonda /= 2;
      }
      totalPartidos +=1;
      
      const tournamentDuration = Math.ceil(totalPartidos / matchesPerDay );
      //const endDate = new Date


      const tournament = new Tournament();
      tournament.name = createTournamentDto.name;
      tournament.startDate = createTournamentDto.startDate;



      console.log("partidos iniciales: ", InitialMatches);
      console.log("horas disponibles por dia: ",availableHoursPerDay);
      console.log("Partidos por dia: ",matchesPerDay);
      console.log("duracion del Torneo en dias : ",tournamentDuration);
      
    
  }

  findAll() {
    return `This action returns all tournament`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tournament`;
  }

  update(id: number, updateTournamentDto: UpdateTournamentDto) {
    return `This action updates a #${id} tournament`;
  }

  remove(id: number) {
    return `This action removes a #${id} tournament`;
  }
}
