import { Controller, Get, Post, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post('/new')
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
