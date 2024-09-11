import { applyDecorators } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export function SwaggerGetMatches() {
    return applyDecorators(
        ApiOperation({
            summary: "Obtener todos los partidos de un torneo",
            description:"Se obtienen todos los partidos con sus detalles, a partir del id del torneo al que pertencen los partidos"
        }),
        ApiResponse({status: 201, description: "Un array de partidos"}),
        ApiResponse({status: 404, description: "NotFoundException"})
    )
}