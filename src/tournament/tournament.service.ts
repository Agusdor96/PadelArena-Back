import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentEntity } from './entities/tournament.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { InscriptionEnum, StatusEnum } from './tournament.enum';
import { FixtureService } from 'src/fixture/fixture.service';
import * as data from "../seed/tournaments.json"
import { validate as uuidValidate } from 'uuid';
import { FileService } from 'src/file/file.service';

@Injectable()
export class TournamentService {
constructor(
  @InjectRepository(TournamentEntity) private tournamentRepository: Repository<TournamentEntity>,
  @InjectRepository(Category) private categoryRepository: Repository<Category>,
  @Inject() private fixtureService: FixtureService,
  @Inject() private fileService: FileService,
){}

  async createTournament(createTournamentDto:any, file?:Express.Multer.File) {

    const category = await this.categoryRepository.findOne({where: {id:createTournamentDto.category}});
      if(!category) throw new BadRequestException("Solo podes crear un torneo que sea de las categorias definidas")
      
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
    if(createTournamentDto.matchDuration < 30) throw new BadRequestException("La duracion de los partidos no puede ser menor a 30 minutos")
    if(createTournamentDto.courts < 1) throw new BadRequestException("No puedes crear un torneo si no tienes canchas disponibles, (courts=0)")
    if(!createTournamentDto.playingDays.length) throw new BadRequestException("Para crear un torneo se debe seleccionar al menos un dia de juego")
    for(let i = 0; i <= createTournamentDto.playingDays.length; i++){
      if(createTournamentDto.playingDays[i] === ""){
        throw new BadRequestException("Se esta recibiendo un campo vacio dentro de playing days, debes completarlo")
      }
    }
    
    const startTime = new Date(createTournamentDto.startTime);
    const endTime = new Date(createTournamentDto.endTime);
    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      throw new BadRequestException("Las fechas de inicio o fin no son válidas.");
  }

    const availableHoursPerDay = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
    const matchesPerDay = (availableHoursPerDay / (createTournamentDto.matchDuration / 60)) * createTournamentDto.courts;
    const totalMatches = createTournamentDto.teamsQuantity - 1;
    const tournamentDuration = Math.ceil(totalMatches / matchesPerDay);
    const endDate = new Date(createTournamentDto.startDate);
    endDate.setDate(endDate.getDate() + tournamentDuration);

    const tournament = new TournamentEntity();
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
      tournament.courtsAvailable = createTournamentDto.courts;
      tournament.category = category;
        
    if(file){
      tournament.tournamentFlyer = await this.fileService.uploadImageToCloudinary(file)
    }
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
    if (!uuidValidate(id)) throw new BadRequestException("Debes proporcionar un id de tipo UUID valido")

    const tournament = await this.getTournament(id);
    if(!tournament) throw new NotFoundException("No se encontro ningun torneo con el id proporcionado")

    await this.tournamentRepository.update(tournament.id, {inscription: InscriptionEnum.CLOSED})
    return await this.fixtureService.createFixture(tournament.id)
  }

  async preloadTournaments(){
    const categoriesFromDb = await this.categoryRepository.find()
    if(!categoriesFromDb.length){
      throw new BadRequestException("Debes precargar las categorias antes que los torneos")
    }

    for(const tournament of data){
      const tournamentCategory = await this.categoryRepository.findOne({
        where:{
          name:tournament.category
        }})

      if(!tournamentCategory){
        throw new BadRequestException("El torneo debe tener una categoria definida")
      }
      const existingTournament = await this.tournamentRepository.findOne({
        where: {
            name: tournament.name, 
        }
      });
      if(existingTournament){
        continue;
      }
        const startTime = new Date(`${tournament.startDate.split("T")[0]}T${tournament.startTime}:00.000Z`);
        const endTime = new Date(`${tournament.startDate.split("T")[0]}T${tournament.endTime}:00.000Z`);

        const newTournament = {
            ...tournament,
            startTime: startTime,
            endTime: endTime,
            category: tournamentCategory.id
        };

      await this.createTournament(newTournament)
    }
    return {message: "Torneos cargados con exito"}
  }
}
