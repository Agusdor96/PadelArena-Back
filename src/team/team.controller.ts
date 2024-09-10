import { Controller, Get, Post, Body, Param, ParseUUIDPipe, UseGuards} from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamDto } from './dto/team.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { SwaggerTeamsInscription } from '../decorators/SwaggerDecorators/Team.decorator';


@ApiTags("TEAM")
@Controller('tournament-team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @ApiBearerAuth()
  @Post(':tournamentId')
  @SwaggerTeamsInscription()
  @UseGuards(AuthGuard)
  newTeam(@Param('tournamentId', ParseUUIDPipe) tournamentId: string, @Body() TeamDto: TeamDto) {
    return this.teamService.teamInscription(tournamentId, TeamDto);
  }
  
  @ApiBearerAuth()
  @Get('oneTeam/:id')
  @UseGuards(AuthGuard)
  getTeamByID(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamService.findOneTeam(id);
  }
  
  @ApiBearerAuth()
  @Get(':tournamentId')
  @UseGuards(AuthGuard)
  getAllTeams(@Param('tournamentId', ParseUUIDPipe) tournamentId:string) {
    return this.teamService.findAllTeamsByTournament(tournamentId);
  }
}
