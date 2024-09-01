import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { Team } from 'src/team/entities/team.entity';
import { TournamentEntity } from 'src/tournament/entities/tournament.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match) private matchRepository: Repository<Match>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    @InjectRepository(TournamentEntity)
    private tournamentRepository :Repository<TournamentEntity>,
  //   @Inject() private tournamentService: TournamentService,
  ) {}

  async createMatch({ teams, tournament }) {
    let currentDayIndex = 0;
    let currentHour = new Date(tournament.startingTime).getTime();
    const endHour = new Date(tournament.finishTime).getTime();
    
    const incrementDay = () => {
      currentDayIndex = (currentDayIndex + 1) % tournament.playingDay.length;
      currentHour = new Date(tournament.startingTime).getTime();
    };
  
    const matches = [];
  
    for (let i = 0; i < teams.length; i ++) {
      const team1 = await this.teamRepository.findOne({ where: { name: teams[i].name } });
      const team2 = await this.teamRepository.findOne({ where: { name: teams[i + 1].name } });
  
      if (!team1 || !team2) {
        throw new NotFoundException('No se encontró uno de los equipos');
      }
      const newMatch = {
        tournament,
        teams: [team1, team2],
        date: tournament.playingDay[currentDayIndex],
        time: new Date(currentHour).toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      };
  
      currentHour += tournament.matchDuration * 60 * 1000;
  
      if (currentHour >= endHour) incrementDay();
  
      const savedMatch = await this.matchRepository.save(newMatch);
      matches.push(savedMatch);
    }
  
    return matches;
  }

  async createMatch2({ teams, tournament }){
    const currentHour = new Date(tournament.startingTime).getHours();
    const endHour = new Date(tournament.finishTime).getHours();
    const matches = [];
    console.log("hora actual", currentHour);
    console.log("hora final", endHour);
    
    const courts = tournament.courtsAvailable;
    console.log("cantidad de canchas", courts);
    
    let courtsIndex = 1;

    const turnsPerDay = endHour - currentHour;
    console.log("1, turnos por dia: ", turnsPerDay);
    
    let appointmentCounter = 1;
    let tournIndex = 0;

    const totalMatches = tournament.team.length - 1;
    console.log("2, cantidad de partidos por torneo ", totalMatches);
    
    const matchDuration = tournament.matchDuration / 60;
    console.log("3, duracion de los partidos: ", matchDuration);
    

    
    
  
      let dateParaUsar = tournament.playingDay[tournIndex];
      if(courts > courtsIndex){
        for (let i = 0; i < teams.length; i+2) {
          const team1 = await this.teamRepository.findOne({ where: { name: teams[i].name } });
          const team2 = await this.teamRepository.findOne({ where: { name: teams[i - 1].name } });
      
          if (!team1 || !team2) {
            throw new NotFoundException('No se encontró uno de los equipos');
          }
          const newMatch = {
            tournament,
            teams: [team1, team2],
            date: dateParaUsar,
            appointment: appointmentCounter,
           // court: 
          }
          if(turnsPerDay > appointmentCounter){
    
            const savedMatch = await this.matchRepository.save(newMatch);
            matches.push(savedMatch);
            appointmentCounter++;
          }
           
        }
        
      }
    }


//   async createMatch3({ teams, tournament }) {
//     const currentHour = new Date(tournament.startingTime).getTime();
//     const endHour = new Date(tournament.finishTime).getTime();
//     const matchDuration = tournament.matchDuration * 60 * 1000; // Convertir la duración de partidos a milisegundos
//     const matches = [];
    
//     const courts = tournament.courtsAvailable;

//     // Calcula cuántos turnos se pueden realizar en un día
//     const totalTurnDuration = endHour - currentHour;
//     const turnsPerDay = Math.floor(totalTurnDuration / matchDuration) * courts;

//     let appointmentCounter = 1;
//     let tournIndex = 0;

//     let remainingTeams = teams.length;

//     // Copiamos el array de equipos para evitar modificar el original
//     let teamsCopy = [...teams];

//     // Recorremos los días disponibles mientras haya equipos para jugar
//     while (tournIndex < tournament.playingDay.length && remainingTeams > 1) {
//         let dateParaUsar = tournament.playingDay[tournIndex];
//         let turnCounter = 0;

//         // Recorremos los turnos disponibles en el día actual
//         while (turnCounter < turnsPerDay && remainingTeams > 1) {
//             // Reseteamos el índice de canchas al comienzo de cada turno
//             let courtsIndex = 0;
            
//             // Iteramos sobre los equipos de dos en dos
//             for (let i = 0; i < teamsCopy.length - 1 && courtsIndex < courts; i += 2) {
//                 const team1 = await this.teamRepository.findOne({ where: { name: teamsCopy[i].name } });
//                 const team2 = await this.teamRepository.findOne({ where: { name: teamsCopy[i + 1].name } });

//                 if (!team1 || !team2) {
//                     throw new NotFoundException('No se encontró uno de los equipos');
//                 }

//                 const newMatch = {
//                     tournament,
//                     teams: [team1, team2],
//                     date: dateParaUsar,
//                     appointment: appointmentCounter,
//                     court: courtsIndex + 1 // Asigna la cancha según el índice
//                 };

//                 const savedMatch = await this.matchRepository.save(newMatch);
//                 matches.push(savedMatch);

//                 // Actualizar el estado de los equipos y canchas
//                 courtsIndex++;
//                 remainingTeams -= 2;

//                 // Remover los equipos que ya jugaron
//                 teamsCopy.splice(i, 2);
//                 i -= 2; // Ajustar el índice para la siguiente iteración

//                 // Si se alcanza el límite de canchas en uso, romper el ciclo
//                 if (courtsIndex >= courts) {
//                     break;
//                 }
//             }

//             appointmentCounter += 1;
//             turnCounter += 1;

//             // Si no hay más equipos para asignar en este turno, salir del bucle de turnos
//             if (teamsCopy.length < 2) {
//                 break;
//             }
//         }

//         tournIndex += 1; // Pasamos al siguiente día
//     }

//     return matches;
// }

  async getAllMatchesFromTournament(tournamentId: string) {
    const tournament = await this.tournamentRepository.findOne({where: {id: tournamentId},relations:{matches:true}})
    const matches = tournament.matches;

    if (!matches.length) {
      throw new NotFoundException(
        'No se encontraron partidos asociados a este torneo',
      );
    }
    return matches;
  }

  async getOneMatch(teamId: string) {
    const match = await this.matchRepository.findOneBy({ id: teamId });
    if (!match) {
      throw new NotFoundException(
        'No se encontro ningun partido con el id proporcionado',
      );
    }

    return match;
  }
}
