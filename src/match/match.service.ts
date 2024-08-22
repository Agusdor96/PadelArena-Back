import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { TournamentService } from 'src/tournament/tournament.service';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match) private matchRepository:Repository<Match>,
    @Inject() private tournamentService:TournamentService
  ){}

  create(createMatchDto: CreateMatchDto) {
    return 'This action adds a new match';
  }

 async getAllMatchesFromTournament(tournamentId:string) {
    const tournament = await this.tournamentService.getTournament(tournamentId)
    const matches = tournament.matches;

    if(!matches.length){
      throw new NotFoundException("No se encontraron partidos asociados a este torneo")
    }
    return matches;
  }

  async getOneMatch(teamId: string) {
    const match = await this.matchRepository.findOneBy({id:teamId})
    if(!match){
      throw new NotFoundException("No se encontro ningun partido con el id proporcionado")
    }

    return match;
  }
}
