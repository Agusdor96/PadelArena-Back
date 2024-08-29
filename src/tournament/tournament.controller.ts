import { Controller, Get, Post, Body, Param, ParseUUIDPipe, UseInterceptors, Put, UseGuards, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { TransformTime } from 'src/interceptors/dateTime.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleEnum } from 'src/user/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags("TOURNAMENT")
@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @Post('/new')
  // @Roles(RoleEnum.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(new TransformTime())
  async create(
    @Body() createTournamentDto: CreateTournamentDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 500000,
            message: 'La imagen no puede pesar mas de 500kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,) {
      await this.tournamentService.createTournament(createTournamentDto);
  }

  @Get()
  getTournaments() {
    return this.tournamentService.getAllTournaments();
  }

  @Get(':id')
  getOneTournament(@Param('id', ParseUUIDPipe) id: string) {
    return this.tournamentService.getTournament(id);
  }

  @Put('closeInscriptions/:id')
  changeInscriptionStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.tournamentService.changeInscriptionStatus(id)
  }
}
