import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileDto } from './dto/file.dto';

@ApiTags("FILE")
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload-tournamentGalery/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({description: "Image to be uploaded",
               type: FileDto,
          })
  uploadMultimedia(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 500000,
            message: 'El archivo no debe pesar mas de 500kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp|mp4|webm|wmv|swf)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.uploadTournamentMultimedia(id, file);
  }

  @Put('update-tournamentFlyer/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({description: "Image to be uploaded",
               type: FileDto,
          })
  updateTournamentFlyer(
    @Param('id', ParseUUIDPipe) id: string,
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
    file: Express.Multer.File,
  ) {
    return this.fileService.UpdateTournamentFlyer(id, file)
  }

  @Put('update-userProfileImage/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({description: "Image to be uploaded",
               type: FileDto,
          })
  updateUserProfileImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'La imagen no puede pesar mas de 200kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileService.updateUserProfileImage(id, file)
  }
}
