import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Put, UploadedFile} from '@nestjs/common';
import { FileService } from './file.service';
import { ApiTags } from '@nestjs/swagger';
import { CustomTournamentFlyer, CustomUserProfileImage } from 'src/decorators/controllerDecorators/fileController.decorator';

@ApiTags("ARCHIVOS")
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Put('update-tournamentFlyer/:id')
  @CustomTournamentFlyer()
  updateTournamentFlyer(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 10485760,
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
  @CustomUserProfileImage()
  updateUserProfileImage(
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 5242880,
            message: 'La imagen no puede pesar mas de 5mb',
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
// @ApiBearerAuth()
  // @Post('upload-tournamentGalery/:id')
  // @Roles(RoleEnum.ADMIN)
  // @UseGuards(AuthGuard,RolesGuard)
  // @UseInterceptors(FileInterceptor('file'))
  // @ApiConsumes('multipart/form-data')
  // @ApiBody({description: "Image to be uploaded",
  //              type: FileDto,
  //         })
  // uploadMultimedia(
  //   @Param('id', ParseUUIDPipe) id: string,
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators: [
  //         new MaxFileSizeValidator({
  //           maxSize: 500000,
  //           message: 'El archivo no debe pesar mas de 500kb',
  //         }),
  //         new FileTypeValidator({
  //           fileType: /(jpg|jpeg|png|webp|mp4|webm|wmv|swf)$/,
  //         }),
  //       ],
  //     }),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   return this.fileService.uploadTournamentMultimedia(id, file);
  // }
