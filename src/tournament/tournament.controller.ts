import { Controller, Get, Post, Body, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { ApiTags } from '@nestjs/swagger';
import { CustomCloseInscriptions, CustomGetAllTournaments, CustomGetTournament, CustomNewTournament } from 'src/decorators/controllerDecorators/tournamentController.decorator';

@ApiTags("TORNEOS")
@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post('/new')
  @CustomNewTournament()
  async create(
    @Body() createTournamentDto: CreateTournamentDto) {
    return  await this.tournamentService.createTournament(createTournamentDto);
  }

  @Get()
  @CustomGetAllTournaments()
  getTournaments() {
    return this.tournamentService.getAllTournaments();
  }

  @Get(':id')
  @CustomGetTournament()
  getOneTournament(@Param('id', ParseUUIDPipe) id: string) {
    return this.tournamentService.getTournament(id);
  }

  @Put('closeInscriptions/:id')
  @CustomCloseInscriptions()
  changeInscriptionStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.tournamentService.changeInscriptionStatus(id)
  }
}
