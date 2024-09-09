import { Controller, Get, Post, Body, Param, ParseUUIDPipe, UseInterceptors, Put, UseGuards } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TransformTime } from 'src/interceptors/dateTime.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleEnum } from 'src/user/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("TOURNAMENT")
@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @ApiBearerAuth()
  @Post('/new')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(new TransformTime())
  async create(
    @Body() createTournamentDto: CreateTournamentDto) {
    return  await this.tournamentService.createTournament(createTournamentDto);
  }

  @Get()
  getTournaments() {
    return this.tournamentService.getAllTournaments();
  }

  @Get(':id')
  getOneTournament(@Param('id', ParseUUIDPipe) id: string) {
    return this.tournamentService.getTournament(id);
  }

  @ApiBearerAuth()
  @Put('closeInscriptions/:id')
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  changeInscriptionStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.tournamentService.changeInscriptionStatus(id)
  }
}
