import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayerStadisticsService } from './player-stadistics.service';
import { CreatePlayerStadisticDto } from './dto/create-player-stadistic.dto';
import { UpdatePlayerStadisticDto } from './dto/update-player-stadistic.dto';

@Controller('player-stadistics')
export class PlayerStadisticsController {
  constructor(private readonly playerStadisticsService: PlayerStadisticsService) {}

  @Post()
  create(@Body() createPlayerStadisticDto: CreatePlayerStadisticDto) {
    return this.playerStadisticsService.create(createPlayerStadisticDto);
  }

  @Get()
  findAll() {
    return this.playerStadisticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerStadisticsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerStadisticDto: UpdatePlayerStadisticDto) {
    return this.playerStadisticsService.update(+id, updatePlayerStadisticDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerStadisticsService.remove(+id);
  }
}
