import { applyDecorators, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { SwaggerProfileImage, SwaggerTournamentFlyer } from "../SwaggerDecorators/Files.decorator";
import { Roles } from "../roles.decorator";
import { RoleEnum } from "src/enums/roles.enum";
import { AuthGuard } from "src/guards/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileDto } from "src/file/dto/file.dto";
import { UserIdINterceptor } from "src/interceptors/userId.interceptor";

export function CustomTournamentFlyer(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerTournamentFlyer(),
        Roles(RoleEnum.ADMIN),
        UseGuards(AuthGuard,RolesGuard),
        UseInterceptors(FileInterceptor('file')),
        ApiConsumes('multipart/form-data'),
        ApiBody({description: "Image to be uploaded",
            type: FileDto,
       })
    )
}

export function CustomUserProfileImage(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerProfileImage(),
        UseGuards(AuthGuard),
        UseInterceptors(UserIdINterceptor,FileInterceptor('file')),
        ApiConsumes('multipart/form-data'),
        ApiBody({description: "Image to be uploaded",
            type: FileDto,
       })
    )
}