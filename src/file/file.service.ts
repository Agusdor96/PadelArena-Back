import { Injectable, NotFoundException } from '@nestjs/common';
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
  async UpdateTournamentPrincipalImage(id:string, file: Express.Multer.File){
    const tournament = await this.tournamentRepostory.findOne({where: {id}})
    if(!tournament){
      throw new NotFoundException('No fue posible encontrar el torneo')
    }else {
      const tournamentFlayer = (await this.fileRepository.uploadImage(file)).secure_url;
      await this.tournamentRepostory.update(id, {})
    }
  }

  UploadTournamentMultimedia(){}

  UpdateProfileImage(){}

  
}
