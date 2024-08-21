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

    if(createTournamentDto.qEquipos % 2 != 0 || createTournamentDto.qEquipos < 16 ) throw new BadRequestException("Team quantity cant be odd or less than 16");
    
      const partidosInicial = createTournamentDto.qEquipos /2;

      const horaComienzo = new Date(createTournamentDto.horaComienzo);

       const horaFin = new Date(createTournamentDto.horaFin);

      const horasDisponiblesPorDia = (horaFin.getTime() - horaComienzo.getTime()) / (1000 * 60 * 60);
      
      const partidosPorDia = (horasDisponiblesPorDia / (createTournamentDto.duracionPartidos / 60)) * createTournamentDto.courts;

      let qPartidosRonda = partidosInicial;
      let totalPartidos = 0;
      while(qPartidosRonda > 1 ){
        totalPartidos += qPartidosRonda;
        qPartidosRonda /= 2;
      }
      totalPartidos +=1;
      
      const duracionTorneo = Math.ceil(totalPartidos / partidosPorDia );
      

      console.log("partidos iniciales: ", partidosInicial);
      console.log("horas disponibles por dia: ",horasDisponiblesPorDia);
      console.log("Partidos por dia: ",partidosPorDia);
      console.log("duracion del Torneo en dias : ",duracionTorneo);
      
    
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
