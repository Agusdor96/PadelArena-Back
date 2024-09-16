import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { TournamentEntity } from '../tournament/entities/tournament.entity';
import { FileRepository } from './file.repository';
import { CloudinaryConnection } from '../config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([User, TournamentEntity])],
  controllers: [FileController],
  providers: [FileService, FileRepository, CloudinaryConnection],
  exports:[FileService]
})
export class FileModule {}
