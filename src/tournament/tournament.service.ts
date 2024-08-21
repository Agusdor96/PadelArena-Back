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
    if (exist && exist.status == "active") throw new BadRequestException('Tournament already exists');
    if(createTournamentDto.qParticipantes % 2 != 0) throw new BadRequestException("Quantity cant be odd");
    else{
      const partidosPorRonda = createTournamentDto.qParticipantes /2;
      const qHorasHabilesDia = (createTournamentDto.horaFin.getTime() - createTournamentDto.horaComienzo.getTime()) / (1000*60*60);
      const qHorasPartidosDia = partidosPorRonda * (createTournamentDto.duracionPartidos /60) ;
      const qPartidosDia = qHorasPartidosDia / qHorasHabilesDia;
      const duracionTorneo = qPartidosDia / createTournamentDto.playingDays.length;
    }
    
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
