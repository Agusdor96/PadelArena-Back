import { applyDecorators } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export function SwaggerTeamsInscription() {
    return applyDecorators(
        ApiOperation({
            summary: "Registro de un equipo a un torneo",
            description:"Para inscribirse a un torneo se debe proveer el Id del torneo por parametro y pasar por body 2 ids: el del usuario que esta realizando la inscripcion y el del compañero que quiere seleccionar. Antes de esto debe pagar a traves del endpoint de MercadoPago. Ambos jugadores deben ser de la misma categoria y debe coincidir tambien la cateogria del torneo"
        }),
        ApiResponse({status: 201, description: "Un objeto equipo"}),
        ApiResponse({status: 400, description: "BadRequestException"}),
        ApiResponse({status: 404, description: "No se encuentra torneo con el id proporcionado"})
    )
}
export function SwaggerGetOneTeam() {
    return applyDecorators(
        ApiOperation({
            summary: "Obtener un equipo",
            description:"Se obtiene un equipo especifico de un torneo en particular, pasando por parametro el id del torneo"
        }),
        ApiResponse({status: 201, description: "Un objeto equipo con la relacion de la categoria"}),
        ApiResponse({status: 404, description: "El equipo no existe, revisa la informacion proporcionada"})
    )
}