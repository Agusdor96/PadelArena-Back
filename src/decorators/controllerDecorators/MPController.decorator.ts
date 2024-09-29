import { applyDecorators, UseGuards, UseInterceptors} from "@nestjs/common";
import { ApiBearerAuth} from "@nestjs/swagger";
import { SwaggerCreatePreference, SwaggerFeedback, SwaggerGetAllPayments, SwaggerInscriptionStatus, SwaggerTournamentPayments, SwaggerUserPayments } from "../SwaggerDecorators/Mp.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { UserIdINterceptor } from "src/interceptors/userId.interceptor";
import { HeaderInterceptor } from "src/interceptors/demo.interceptor";
import { RoleEnum } from "src/enums/roles.enum";
import { Roles } from "../roles.decorator";
import { RolesGuard } from "src/guards/roles.guard";

export function CustomCreatePreference(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerCreatePreference(),
        UseGuards(AuthGuard),
        UseInterceptors(UserIdINterceptor)
    )
}

export function CustomFeedBack(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerFeedback(),
        UseGuards(AuthGuard),
        UseInterceptors(HeaderInterceptor)
    )
}

export function CustomInscriptionStatus(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerInscriptionStatus(),
        UseGuards(AuthGuard),
    )
}

export function CustomGetPayments(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerGetAllPayments(),
        Roles(RoleEnum.ADMIN),
        UseGuards(AuthGuard,RolesGuard)
    )
}

export function CustomTournamentPayments(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerTournamentPayments(),
        Roles(RoleEnum.ADMIN),
        UseGuards(AuthGuard,RolesGuard)
    )
}

export function CustomUserPayments(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerUserPayments(),
        UseGuards(AuthGuard)
    )
}

