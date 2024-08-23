import { Controller, Get, Post, Body, Param, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TransformTime } from 'src/interceptors/dateTime.interceptor';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post('/new')
  @UseInterceptors(new TransformTime())
  create(@Body() createTournamentDto: CreateTournamentDto) {
    try {
      this.tournamentService.create(createTournamentDto);
      return {message:"Torneo creado con exito", createTournamentDto};
    } catch (error) {
      return {message:"Error al crear torneo", error};
    }
  }

  @Get()
  getTournaments() {
    return this.tournamentService.getAllTournaments();
  }

  @Get(':id')
  getOneTournament(@Param('id', ParseUUIDPipe) id: string) {
    return this.tournamentService.getTournament(id);
  }

}
