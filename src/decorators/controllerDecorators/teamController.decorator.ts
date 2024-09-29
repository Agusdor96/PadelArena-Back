import { applyDecorators, UseGuards} from "@nestjs/common";
import { ApiBearerAuth} from "@nestjs/swagger";
import { AuthGuard } from "src/guards/auth.guard";
import { SwaggerGetAllTeams, SwaggerGetOneTeam, SwaggerTeamsInscription } from "../SwaggerDecorators/Team.decorator";


export function CustomTeamInscription(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerTeamsInscription(),
        UseGuards(AuthGuard)
    )
}

export function CustomGetTeam(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerGetOneTeam(),
        UseGuards(AuthGuard)
    )
}

export function CustomGetAllTeams(){
    return applyDecorators(
        ApiBearerAuth(),
        SwaggerGetAllTeams(),
        UseGuards(AuthGuard)
    )
}

