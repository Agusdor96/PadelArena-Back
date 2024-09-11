import { applyDecorators } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export function SwaggerGetMessages() {
    return applyDecorators(
        ApiOperation({
            summary: "Obtener los ultimos 15 mensajes escritos en el chat",
            description:"Se utiliza este endpoint para acceder a los ultimos 15 mensajes que se guardaron en la base de datos"
        }),
        ApiResponse({status: 200, description: "Todavia no hay mensajes"}),
        ApiResponse({status: 201, description: "Un array de objetos mensaje con el usuario que envio el mensaje y el contenido del mensaje"})
    )
}