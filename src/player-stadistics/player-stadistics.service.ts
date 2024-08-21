import { Injectable } from '@nestjs/common';
import { CreatePlayerStadisticDto } from './dto/create-player-stadistic.dto';
import { UpdatePlayerStadisticDto } from './dto/update-player-stadistic.dto';

@Injectable()
export class PlayerStadisticsService {
  create(createPlayerStadisticDto: CreatePlayerStadisticDto) {
    return 'This action adds a new playerStadistic';
  }

  findAll() {
    return `This action returns all playerStadistics`;
  }

  findOne(id: number) {
    return `This action returns a #${id} playerStadistic`;
  }

  update(id: number, updatePlayerStadisticDto: UpdatePlayerStadisticDto) {
    return `This action updates a #${id} playerStadistic`;
  }

  remove(id: number) {
    return `This action removes a #${id} playerStadistic`;
  }
}
