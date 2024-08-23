import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { StatusEnum } from './tournament.enum';

@Injectable()
export class TournamentService {
constructor(
  @InjectRepository(Tournament) private tournamentRepository: Repository<Tournament>,
  @InjectRepository(Category) private categoryRepository: Repository<Category>,
){}

  async create(createTournamentDto: CreateTournamentDto) {
    const exist = await this.tournamentRepository.findOne({where: {name: createTournamentDto.name}});
    if (exist && exist.status) 
      throw new BadRequestException('Tournament already exists');
    if(createTournamentDto.teamsQuantity % 2 != 0 || createTournamentDto.teamsQuantity < 16 ) 
      throw new BadRequestException("Team quantity cant be odd or less than 16");

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
      
      const category = await this.categoryRepository.findOne({where: {name:createTournamentDto.category.name}});
        if(!category){
          throw new BadRequestException("Solo podes crear un torneo que sea de las categorias definidas")
        }

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
        tournament.tournamentFlyer = createTournamentDto.tournamentImg;
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
