import { Controller, Get, Post, Body, Param, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TransformTime } from 'src/interceptors/dateTime.interceptor';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("TOURNAMENT")
@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post('/new')
  // @Roles(RoleEnum.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(new TransformTime())
  async create(@Body() createTournamentDto: CreateTournamentDto) {
      await this.tournamentService.create(createTournamentDto);
    return {message:"Torneo creado con exito", createTournamentDto};
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
