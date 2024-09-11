import { applyDecorators } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export function SwaggerTournamentFlyer() {
    return applyDecorators(
        ApiOperation({
            summary: "Actualizar la foto de portada de un torneo",
            description:"Se selecciona un torneo a partir de su Id, y luego se elije una imagen lo represente. Esta configurado para que la imagen se cargue en la plataforma Cloudinary, por lo que se debe tener una cuenta configurada con sus respectivas variables de entorno. Una vez la imagen se guarde en la plataforma, automaticamente se actualizara la imagen del torneo seleccionado"
        }),
        ApiResponse({status: 201, description: "Imagen actualizada con exito"}),
        ApiResponse({status: 404, description: "No fue posible encontrar el torneo"})
    )
}
export function SwaggerProfileImage() {
    return applyDecorators(
        ApiOperation({
            summary: "Actualizar la foto de perfil de un usuario",
            description:"Se selecciona un usuario a partir de su Id, y se elije la foto de perfil deseada. El proceso es igual al explicado en el endpoint para actualizar la portada de un torneo"
        }),
        ApiResponse({status: 201, description: "Retorna la URL que devuelve Cloudinary"}),
        ApiResponse({status: 404, description: "No fue posible encontrar al usuario"})
    )
}
