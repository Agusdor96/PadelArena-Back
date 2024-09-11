import { applyDecorators } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export function SwaggerGetStadistics() {
    return applyDecorators(
        ApiOperation({
            summary: "Obtener las estadisticas de un usuario",
            description:"A partir del id de un usuario especifico, se obtiene el historial de sus estadisticas de juego: cuantos partidos y torneos gano o perdio"
        }),
        ApiResponse({status: 200, description: "El jugador no tiene estadisticas aun"}),
        ApiResponse({status: 201, description: "Un objeto con las estadisticas del usuario"}),
        ApiResponse({status: 404, description: "NotFoundException, en el caso de no encontrar al usuario seleccionado"})
    )
}