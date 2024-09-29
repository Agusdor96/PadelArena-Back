import { Controller, Get, Post, Body, Param, ParseUUIDPipe, UseGuards} from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamDto } from './dto/team.dto';
import { ApiTags } from '@nestjs/swagger';
import { CustomGetAllTeams, CustomGetTeam, CustomTeamInscription } from 'src/decorators/controllerDecorators/teamController.decorator';


@ApiTags("EQUIPOS")
@Controller('tournament-team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post(':tournamentId')
  @CustomTeamInscription()
  newTeam(@Param('tournamentId', ParseUUIDPipe) tournamentId: string, @Body() TeamDto: TeamDto) {
    return this.teamService.teamInscription(tournamentId, TeamDto);
  }
  
  @Get('oneTeam/:id')
  @CustomGetTeam()
  getTeamByID(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamService.findOneTeam(id);
  }
  
  @Get(':tournamentId')
  @CustomGetAllTeams()
  getAllTeams(@Param('tournamentId', ParseUUIDPipe) tournamentId:string) {
    return this.teamService.findAllTeamsByTournament(tournamentId);
  }
}
