import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayerStadistic } from './entities/player-stadistic.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Team } from 'src/team/entities/team.entity';

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
  console.log("###", playersWinners, "###");
  
  const playersLoosers = teamLooser[0].user;
  console.log(playersLoosers);

    teamLooser[0].ableForPlay = false;
    await this.teamRepository.save(teamLooser[0]);

    

    for (const player of playersWinners) {
      let playerStadistic = await this.playerStadisticRepository.findOneBy(player.playerStadistic)
      console.log("winner", player);
      if(player.playerStadistic === null){
        const stat = await this.playerStadisticRepository.save({ won: 1 });
        console.log("win", stat);
        player.playerStadistic = stat
        await this.userRepository.save(player)
      }
      playerStadistic.won += 1;
      const stat2 = await this.playerStadisticRepository.save(playerStadistic)
      console.log("stat2 winner", stat2);
      
    }


    for (const player of playersLoosers) {
      const playerStadistic = await this.playerStadisticRepository.findOneBy(player.playerStadistic)
      console.log("looser",player);
     if(player.playerStadistic === null){

       const stat = await this.playerStadisticRepository.save({loss: + 1});
       console.log("loos", stat);
       
       player.playerStadistic = stat
       await this.userRepository.save(player)
      }
      playerStadistic.loss += 1
      await this.playerStadisticRepository.save(playerStadistic);
      

    }
    return { message: 'Estadisticas actualizadas con exito' };
  }
}
