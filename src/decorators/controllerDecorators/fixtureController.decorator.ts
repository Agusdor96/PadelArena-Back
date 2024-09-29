import { applyDecorators, UseGuards } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RoleEnum } from "src/enums/roles.enum";
import { Roles } from "../roles.decorator";
import { SwaggerGetFixture, SwaggerUpdateMatchWinner } from "../SwaggerDecorators/Fixture.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { RolesGuard } from "src/guards/roles.guard";

export function CustomUpdateWinners(){
    return applyDecorators(
        ApiBearerAuth(),
        Roles(RoleEnum.ADMIN),
        SwaggerUpdateMatchWinner(),
        UseGuards(AuthGuard,RolesGuard),
    )
}

export function CustomGetFixture(){
    return applyDecorators(
        SwaggerGetFixture()
    )
}