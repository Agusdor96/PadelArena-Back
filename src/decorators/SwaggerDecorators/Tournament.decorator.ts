import { applyDecorators } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export function SwaggerNewTournament() {
    return applyDecorators(
        ApiOperation({
            summary: "Crear un nuevo torneo",
            description:"**ORGANIZADOR**. El organizador debe tener el rol de ADMINISTRADOR. Es él, el que llenando los campos con la informacion solicitada segun sus preferencias, podra crear un nuevo torneo para que los jugadores puedan inscribirse y participar. El PlusCode se obtiene al seleccionar una ubicacion de comercio desde google maps"
        }),
        ApiResponse({status: 201, description: "Devuelve el torneo creado con todos sus detalles"}),
        ApiResponse({status: 400, description: "BadRequestException"})
    )
}
export function SwaggerGetAllTournaments() {
    return applyDecorators(
        ApiOperation({
            summary: "Obtener todos los torneos",
            description:"Este es un endpoint de libre acceso a partir del cual se obtienen todos los torneos disponibles en la aplicacion"
        }),
        ApiResponse({status: 200, description: "Devuelve un array con todos los torneos existentes, sus detalles y la relacion con su respectiva categoria"}),
        ApiResponse({status: 404, description: "NotFoundException"})
    )
}
export function SwaggerGetOneTournament() {
    return applyDecorators(
        ApiOperation({
            summary: "Obtener un torneo",
            description:"Se obtiene el detalle del torneo seleccionado a partir de su Id"
        }),
        ApiResponse({status: 200, description: "Devuelve un objeto torneo con su relacion con: equipos, partidos, fixture, categoria y el equipo ganador"}),
        ApiResponse({status: 404, description: "NotFoundException"})
    )
}
export function SwaggerCloseInscriptions() {
    return applyDecorators(
        ApiOperation({
            summary: "Cerrar las inscripciones del torneo",
            description:"**ORGANIZADOR**. A traves de este endpoint el organizador podra cerrar las inscripciones de los torneos una vez que cumpla con la cantidad de equipos requeridos. Esto ejecutara una funcion que actualiza las inscripciones del torneo y a su vez se creara el fixture con la primer ronda del torneo y sus respectivos partidos."
        }),
        ApiResponse({status: 201, description: "Devuelve un mensaje de exito con el id del Fixture correspondiente al torneo."}),
        ApiResponse({status: 400, description: "BadRequestException"}),
        ApiResponse({status: 404, description: "NotFoundException"})
    )
}