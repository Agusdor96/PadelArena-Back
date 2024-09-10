import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerStadistic } from './entities/player-stadistic.entity';
import { In, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Team } from '../team/entities/team.entity';

@Injectable()
export class PlayerStadisticsService {
  constructor(
    @InjectRepository(PlayerStadistic)
    private playerStadisticRepository: Repository<PlayerStadistic>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  async addStats(teamsIdArray: string[], winnerId: string) {
    const teams = await this.teamRepository.find({
      where: { id: In(teamsIdArray) },
      relations: { user: { playerStadistic: true } },
    });

    const teamWinner = teams.filter((team) => team.id === winnerId);
    const teamLooser = teams.filter((team) => team.id !== winnerId);
    const playersWinners = teamWinner[0].user;
    const playersLoosers = teamLooser[0].user;
    
    teamLooser[0].ableForPlay = false;
    await this.teamRepository.save(teamLooser[0]);

    for (const player of playersWinners) {
      const playerStadistic = await this.playerStadisticRepository.findOneBy(player.playerStadistic)

      if(player.playerStadistic === null){
        const stat = await this.playerStadisticRepository.save({ won: 1 }); 
        player.playerStadistic = stat
        await this.userRepository.save(player)
      } else{ 
        playerStadistic.won += 1;
        await this.playerStadisticRepository.save(playerStadistic)
      }
    }

    for (const player of playersLoosers) {
      const playerStadistic = await this.playerStadisticRepository.findOneBy(player.playerStadistic)
     
      if(player.playerStadistic === null){
       const stat = await this.playerStadisticRepository.save({loss: 1});
       player.playerStadistic = stat
       await this.userRepository.save(player)
      } else{
        playerStadistic.loss += 1
        await this.playerStadisticRepository.save(playerStadistic);
      }    
    }

    return { message: 'Estadisticas actualizadas con exito' };
  }

  async getPlayerStadistics(playerId: string) {
    const player = await this.userRepository.findOne({where:{id:playerId},relations:{playerStadistic:true}})
    if(!player) throw new NotFoundException("No se encontro jugador con el id proporcionado")

    const stadistic = await this.playerStadisticRepository.findOneBy(player.playerStadistic)
    if(!stadistic) return ("El jugador no tiene estadisticas aun")
      
    return stadistic;
    
  }
}
