import { Controller, Get, Post, Body, Param, ParseUUIDPipe, UseInterceptors, Put, UseGuards } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TransformTime } from '../interceptors/dateTime.interceptor';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { RoleEnum } from '../user/roles.enum';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

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

  // @Get('tournamentWinner/:userId')
  // teamWinner (@Param('userId', ParseUUIDPipe) userId:string){
  //   return this.tournamentService.tournamentWinner(userId)
  // }
}
