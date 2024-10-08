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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileDto } from './dto/file.dto';
import { UserIdINterceptor } from '../interceptors/userId.interceptor';
import { AuthGuard } from '../guards/auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RoleEnum } from '../user/roles.enum';
import { RolesGuard } from '../guards/roles.guard';
import { SwaggerProfileImage, SwaggerTournamentFlyer } from '../decorators/SwaggerDecorators/Files.decorator';

@ApiTags("ARCHIVOS")
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @ApiBearerAuth()
  @Put('update-tournamentFlyer/:id')
  @SwaggerTournamentFlyer()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
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

  @ApiBearerAuth()
  @Put('update-userProfileImage/:id')
  @SwaggerProfileImage()
  @UseGuards(AuthGuard)
  @UseInterceptors(UserIdINterceptor,FileInterceptor('file'))
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
