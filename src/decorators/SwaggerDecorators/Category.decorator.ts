import { applyDecorators } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export function SwaggerCategory() {
    return applyDecorators(
        ApiOperation({
            summary: "Obtener todas las categorias",
            description:"A partir de este endpoint se pueden obtener todas las categorias definidas dentro de la aplicacion"
        }),
        ApiResponse({status:201, description: "Un array con todos los objetos category"}),
        ApiResponse({status: 400, description: "El nombre no corresponde al email asociado"})
    )
}
