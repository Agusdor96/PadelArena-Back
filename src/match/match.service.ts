import { Inject, Injectable } from '@nestjs/common';
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
  
  }

  findOne(id: number) {
    return `This action returns a #${id} match`;
  }
}
