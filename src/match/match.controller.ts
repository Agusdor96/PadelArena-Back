import { Controller, Get,  Param, ParseUUIDPipe } from '@nestjs/common';
import { MatchService } from './match.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("MATCH")
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}
  
  @Get("/tournament/:tournamentId")
  getAllMatches(
    @Param("tournamentId", ParseUUIDPipe) tournamentId:string){
    return this.matchService.getAllMatchesFromTournament(tournamentId);
  }

  @Get(':matchId')
  getOneMatch(@Param('matchId', ParseUUIDPipe) matchId: string) {
    return this.matchService.getOneMatch(matchId);
  }
}
