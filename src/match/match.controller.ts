import { Controller, Get,  Param, ParseUUIDPipe } from '@nestjs/common';
import { MatchService } from './match.service';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerGetMatches } from 'src/decorators/SwaggerDecorators/Match.decorator';

@ApiTags("MATCH")
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}
  
  @Get("/tournament/:tournamentId")
  @SwaggerGetMatches()
  getAllMatches(
    @Param("tournamentId", ParseUUIDPipe) tournamentId:string){
    return this.matchService.getAllMatchesFromTournament(tournamentId);
  }
}
