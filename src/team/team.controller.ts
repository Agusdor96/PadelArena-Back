import { Controller, Get, Post, Body, Param, ParseUUIDPipe} from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamDto } from './dto/team.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("TEAM")
@Controller('tournament-team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post(':tournamentId')
  // @UseGuards(AuthGuard)
  newTeam(@Param('tournamentId', ParseUUIDPipe) tournamentId: string, @Body() TeamDto: TeamDto) {
    return this.teamService.newTeam(tournamentId, TeamDto);
  }
  
  @Get('oneTeam/:id')
  getTeamByID(@Param('id', ParseUUIDPipe) id: string) {
    return this.teamService.findOneTeam(id);
  }

  @Get(':tournamentId')
  // @Roles(RoleEnum.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  getAllTeams(@Param('tournamentId', ParseUUIDPipe) tournamentId:string) {
    return this.teamService.findAllTeamsByTournament(tournamentId);
  }
}
