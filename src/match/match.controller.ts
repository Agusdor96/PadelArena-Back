import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Controller('tournament-match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.create(createMatchDto);
  }

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
