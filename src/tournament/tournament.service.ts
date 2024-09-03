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
import { addDays, format, parse, differenceInHours } from 'date-fns';

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

    const InitialMatches = createTournamentDto.teamsQuantity /2;
    const startTime = parse(createTournamentDto.startTime, 'HH:mm', new Date());
    const endTime = parse(createTournamentDto.endTime, 'HH:mm', new Date());
    const availableHoursPerDay = differenceInHours(endTime, startTime);
    const matchesPerDay = (availableHoursPerDay / (createTournamentDto.matchDuration / 60)) * createTournamentDto.courts;

    let qMatchRounds = InitialMatches;
    let totalMatches = 0;
    while(qMatchRounds > 1 ){
      totalMatches += qMatchRounds;
        qMatchRounds /= 2;
      }
      totalMatches +=1;
  
      const tournamentDuration = Math.ceil(totalMatches / matchesPerDay);

      const endDate = addDays(new Date(createTournamentDto.startDate), tournamentDuration);

      const tournament = new TournamentEntity();
        tournament.name = createTournamentDto.name;
        tournament.startDate = createTournamentDto.startDate;
        tournament.endDate = endDate;
        tournament.startingTime = format(startTime, 'HH:mm'); 
        tournament.finishTime = format(endTime, 'HH:mm');
        tournament.playingDay = createTournamentDto.playingDays;
        tournament.status = StatusEnum.UPCOMING;
        tournament.teamsQuantity = createTournamentDto.teamsQuantity;
        tournament.matchDuration = createTournamentDto.matchDuration;
        tournament.description = createTournamentDto.description;
        tournament.tournamentFlyer = createTournamentDto.tournamentFlyer;
        tournament.courtsAvailable = createTournamentDto.courts;
        tournament.category = category;
        tournament.price = createTournamentDto.price;
    
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
    const teams = tournament.team
    if(!tournament) throw new NotFoundException("No se encontro ningun torneo con el id proporcionado")
    if(teams.length !== tournament.teamsQuantity ){
      throw new BadRequestException("No se puede cerrar un torneo sin la cantidad de equipos exacta (16, 32 o 64)");
    }
    await this.tournamentRepository.update(tournament.id, {inscription: InscriptionEnum.CLOSED, status: StatusEnum.INPROGRESS})
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
      const startTime = tournament.startTime; 
      const endTime = tournament.endTime;

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
