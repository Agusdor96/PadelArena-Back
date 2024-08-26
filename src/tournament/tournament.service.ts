import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { InscriptionEnum, StatusEnum } from './tournament.enum';
import { FixtureService } from 'src/fixture/fixture.service';
import * as data from "../seed/tournaments.json"

@Injectable()
export class TournamentService {
constructor(
  @InjectRepository(Tournament) private tournamentRepository: Repository<Tournament>,
  @InjectRepository(Category) private categoryRepository: Repository<Category>,
  @Inject() private fixtureService: FixtureService
){}

  async create(createTournamentDto) {

    const category = await this.categoryRepository.findOne({where: {id:createTournamentDto.category}});
      if(!category){
          throw new BadRequestException("Solo podes crear un torneo que sea de las categorias definidas")
      }

      const existingTournament = await this.tournamentRepository.findOne({
        where: {
            category: { id: createTournamentDto.category },
            startDate: createTournamentDto.startDate
        },
    });
    
    
    if (existingTournament) {
      throw new BadRequestException("No se puede crear el torneo. No se pueden crear dos torneos de la misma categoría con la misma fecha de inicio.");
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
        tournament.status = StatusEnum.UPCOMING;
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
    const tournaments = await this.tournamentRepository.find({
      relations:{
        category:true
      }
    })
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

  async changeInscriptionStatus(id:string){
    const tournament = await this.getTournament(id);
    await this.tournamentRepository.update(tournament.id, {inscription: InscriptionEnum.CLOSED})
    return await this.fixtureService.createFixture(tournament)
  }

  async preloadTournaments(){
    const categoriesFromDb = await this.categoryRepository.find()
    const tournamentsFromDb = await this.tournamentRepository.find()
    if(!categoriesFromDb){
      throw new BadRequestException("Debes precargar las categorias antes que los torneos")
    }else if(tournamentsFromDb.length > 0){
      throw new BadRequestException("Ya hay torneos en la base de datos")
    }

    for(const tournament of data){
      const tournamentCategory = await this.categoryRepository.findOne({
        where:{
          name:tournament.category
        }})

      if(!tournamentCategory){
        throw new BadRequestException("El torneo debe tener una categoria definida")
      }
      const startTime = new Date(`${tournament.startDate.split("T")[0]}T${tournament.startTime}:00.000Z`);
        const endTime = new Date(`${tournament.startDate.split("T")[0]}T${tournament.endTime}:00.000Z`);

        const newTournament = {
            ...tournament,
            startTime: startTime,
            endTime: endTime,
            category: tournamentCategory.id
        };

      await this.create(newTournament)
        return {message: "Torneos cargados con exito"}
    }
  }
}
