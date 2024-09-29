import { applyDecorators, UseGuards, UseInterceptors} from "@nestjs/common";
import { ApiBearerAuth} from "@nestjs/swagger";
import { SwaggerGetAllUsers, SwaggerGetOneUser, SwaggerGetUsersByCategory, SwaggerGetUsersFromTournament, SwaggerMakeMeAdmin, SwaggerUpdateUser, SwaggerUpdateUserCategory } from "../SwaggerDecorators/User.decorator";
import { Roles } from "../roles.decorator";
import { RoleEnum } from "src/enums/roles.enum";
import { AuthGuard } from "src/guards/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { PasswordInterceptor } from "src/interceptors/passwords.interceptor";
import { UserIdINterceptor } from "src/interceptors/userId.interceptor";

export function CustomGetAllUsers(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerGetAllUsers(),
        Roles(RoleEnum.ADMIN),
        UseGuards(AuthGuard, RolesGuard),
        UseInterceptors(PasswordInterceptor)
    )
}

export function CustomUsersFromCategory(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerGetUsersByCategory(),
        UseGuards(AuthGuard),
        UseInterceptors(PasswordInterceptor)
    )
}

export function CustomUpdateUserRole(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerMakeMeAdmin(),
        UseGuards(AuthGuard)
    )
}

export function CustomUpdateUserProfile(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerUpdateUser(),
        UseGuards(AuthGuard),
        UseInterceptors(UserIdINterceptor)
    )
}

export function CustomUpdateUserCategory(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerUpdateUserCategory(),
        Roles(RoleEnum.ADMIN),
        UseGuards(AuthGuard, RolesGuard),
        UseInterceptors(PasswordInterceptor)
    )
}

export function CustomGetUsersFromTournament(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerGetUsersFromTournament(),
        UseGuards(AuthGuard),
        UseInterceptors(PasswordInterceptor)
    )
}

export function CustomGetUser(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerGetOneUser(),
        UseGuards(AuthGuard),
        UseInterceptors(PasswordInterceptor)
    )
}