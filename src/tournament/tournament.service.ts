import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { StatusEnum } from './tournament.enum';

@Injectable()
export class TournamentService {
constructor(
  @InjectRepository(Tournament) private tournamentRepository: Repository<Tournament>,
  @InjectRepository(Category) private categoryRepository: Repository<Category>,
){}

  async create(createTournamentDto: CreateTournamentDto) {

    const category = await this.categoryRepository.findOne({where: {id:createTournamentDto.category}});
      if(!category){
          throw new BadRequestException("Solo podes crear un torneo que sea de las categorias definidas")
      }

      const existingTournament = await this.tournamentRepository.findOne({
        where: {
            name: createTournamentDto.name,
            category: { id: createTournamentDto.category },
            startDate: createTournamentDto.startDate
        },
    });
    
    
    if (existingTournament) {
      throw new BadRequestException("No se puede crear el torneo. Ya existe un torneo con el mismo nombre y categoría que está 'en progreso' o 'por comenzar'. Además, no se pueden crear dos torneos de la misma categoría con la misma fecha de inicio.");
    }

    if (createTournamentDto.teamsQuantity !== 16 && createTournamentDto.teamsQuantity !== 32 && createTournamentDto.teamsQuantity !== 64) {
      throw new BadRequestException("La cantidad de equipos en el torneo debe ser 16, 32 o 64")
    }

      const InitialMatches = createTournamentDto.teamsQuantity /2;
      const startTime = new Date(createTournamentDto.startTime);
      const endTime = new Date(createTournamentDto.endTime);
      const availableHoursPerDay = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      const matchesPerDay = (availableHoursPerDay / (createTournamentDto.matchDuration / 60)) * createTournamentDto.courts;

      let qMatchRounds = InitialMatches;
      let totalMatches = 0;
      while(qMatchRounds > 1 ){
        totalMatches += qMatchRounds;
        qMatchRounds /= 2;
      }
      totalMatches +=1;
  
      const tournamentDuration = Math.ceil(totalMatches / matchesPerDay);

      const endDate = new Date(createTournamentDto.startDate);
      endDate.setDate(endDate.getDate() + tournamentDuration);

      const tournament = new Tournament();
        tournament.name = createTournamentDto.name;
        tournament.startDate = createTournamentDto.startDate;
        tournament.endDate = endDate;
        tournament.startingTime = createTournamentDto.startTime;
        tournament.finishTime = createTournamentDto.endTime;
        tournament.playingDay = createTournamentDto.playingDays;
        tournament.status = StatusEnum.PENDING;
        tournament.teamsQuantity = createTournamentDto.teamsQuantity;
        tournament.matchDuration = createTournamentDto.matchDuration;
        tournament.description = createTournamentDto.description;
        tournament.tournamentFlyer = createTournamentDto.tournamentFlyer;
        tournament.courtsAvailable = createTournamentDto.courts;
        tournament.category = category;
    
      const newTournament = await this.tournamentRepository.save(tournament);

      return newTournament;
    
  }

  async getAllTournaments() {
    const tournaments = await this.tournamentRepository.find()
    if(!tournaments.length){
      throw new NotFoundException("No hay torneos creados")
    }
    return tournaments;
  }

  async getTournament(id: string) {
    const tournament = await this.tournamentRepository.findOne({
      where: {
        id:id
      },
      relations: {
        team:true,
        matches:true,
        fixture:true,
        category: true
      }
    })
    if(!tournament){
      throw new NotFoundException("No se encuentra torneo con el id proporcionado")
    }
  
    return tournament;
  }
}
