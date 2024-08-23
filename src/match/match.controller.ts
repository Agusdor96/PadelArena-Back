import { Controller, Get,  Param, ParseUUIDPipe } from '@nestjs/common';
import { MatchService } from './match.service';


@Controller('tournament-match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}
  
  @Get(":tournamentId")
  getAllMatches(
    @Param("tournamentId", ParseUUIDPipe) tournamentId:string){
    return this.matchService.getAllMatchesFromTournament(tournamentId);
  }

  @Get(':matchId')
  getOneMatch(@Param('matchId') matchId: string) {
    return this.matchService.getOneMatch(matchId);
  }
}
