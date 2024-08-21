import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tournament } from 'src/tournament/entities/tournament.entity';
import { FileRepository } from './file.repository';
import { CloudinaryConnection } from 'src/config/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([User, Tournament])],
  controllers: [FileController],
  providers: [FileService, FileRepository, CloudinaryConnection],
})
export class FileModule {}
