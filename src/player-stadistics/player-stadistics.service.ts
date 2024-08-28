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
  
    const playersLoosers = teamLooser[0].user;

    teamLooser[0].ableForPlay = false;
    await this.teamRepository.save(teamLooser[0]);

    for (const player of playersWinners) {
      const stat = await this.playerStadisticRepository.save({ won: +1 });
      player.playerStadistic = stat
      await this.userRepository.save(player)
    }


    for (const player of playersLoosers) {
      const stat = await this.playerStadisticRepository.save({loss: + 1});
      player.playerStadistic = stat
      await this.userRepository.save(player)
    }
    return { message: 'Estadisticas actualizadas con exito' };
  }
}
