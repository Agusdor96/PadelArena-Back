import { applyDecorators, UseGuards, UseInterceptors} from "@nestjs/common";
import { ApiBearerAuth} from "@nestjs/swagger";
import { SwaggerCloseInscriptions, SwaggerGetAllTournaments, SwaggerGetOneTournament, SwaggerNewTournament } from "../SwaggerDecorators/Tournament.decorator";
import { Roles } from "../roles.decorator";
import { RoleEnum } from "src/user/roles.enum";
import { AuthGuard } from "src/guards/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { TransformTime } from "src/interceptors/dateTime.interceptor";

export function CustomNewTournament(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerNewTournament(),
        Roles(RoleEnum.ADMIN),
        UseGuards(AuthGuard, RolesGuard),
        UseInterceptors(new TransformTime())
    )
}

export function CustomGetAllTournaments(){
    return applyDecorators(
        SwaggerGetAllTournaments()
    )
}

export function CustomGetTournament(){
    return applyDecorators(
        SwaggerGetOneTournament()
    )
}

export function CustomCloseInscriptions(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerCloseInscriptions(),
        Roles(RoleEnum.ADMIN),
        UseGuards(AuthGuard, RolesGuard)
    )
}