import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('tournament/:tournamentId/team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  getTeams(
    @Param("tournamentId", ParseUUIDPipe) tournamentId:string) {
    return this.teamService.getTeamsFromTournament(tournamentId);
  }

  @Get(':id')
  getOneTeam(
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Param("tournamentId", ParseUUIDPipe) tournamentId:string
  ) {
    return this.teamService.getOneTeamFromTournament(teamId, tournamentId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id);
  }
}
