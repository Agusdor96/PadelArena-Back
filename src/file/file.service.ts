import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { FileRepository } from './file.repository';


@Injectable()
export class FileService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepostory: Repository<Tournament>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private fileRepository: FileRepository
  ){}
  UpdateTournamentPrincipalImage() {}

  UploadTournamentMultimedia(){}

  UpdateProfileImage(){}

  
}
