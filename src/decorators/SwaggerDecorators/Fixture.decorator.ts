import { applyDecorators } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export function SwaggerUpdateMatchWinner() {
    return applyDecorators(
        ApiOperation({
            summary: "Actualiza el partido con el equipo ganador",
            description:"**ORGANIZADOR**. Por parametro se debe proveer el Id del equipo que ha ganado el partido, y por el body de la solicitud se provee el id del partido que se quiere actualizar. Esto ademas, por detras, actualizara las estadisticas de los jugadores. Cuando se actualice el ultimo partido de una ronda, automaticamente se generara la siguiente ronda del fixture con los equipos que fueron seleccionados ganadores anteriormente. Cuando se se actualice el ultimo partido del torneo, es decir, `la final`, el estado del torneo se actualizara a `finalizado` y se le asignara al torneo el equipo ganador. A su vez se actualizaran como siempre las estadisticas de los jugadores"
        }),
        ApiResponse({status: 200, description: "Retorna el fixture actualizado completo"}),
        ApiResponse({status: 400, description: "BadRequestException"}),
        ApiResponse({status: 404, description: "NotFoundException"})
    )
}
export function SwaggerGetFixture() {
    return applyDecorators(
        ApiOperation({
            summary: "Obtener un fixture especifico",
            description:"Se pasa por parametro el Id del fixture que se desea obtener"
        }),
        ApiResponse({status: 201, description: "Devuelve el fixture con la relaciones asociadas: ronda, partidos, equipos, equipos ganadores."}),
        ApiResponse({status: 404, description: "NotFoundException"})
    )
}