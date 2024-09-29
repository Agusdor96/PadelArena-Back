import { Controller, Get,  Param, ParseUUIDPipe } from '@nestjs/common';
import { MatchService } from './match.service';
import { ApiTags } from '@nestjs/swagger';
import { CustomGetMatches } from 'src/decorators/controllerDecorators/matchController.decorator';

@ApiTags("PARTIDOS")
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}
  
  @Get("/tournament/:tournamentId")
  @CustomGetMatches()
  getAllMatches(
    @Param("tournamentId", ParseUUIDPipe) tournamentId:string){
    return this.matchService.getAllMatchesFromTournament(tournamentId);
  }
}
