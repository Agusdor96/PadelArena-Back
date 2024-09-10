import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function SwaggerUpdateUser() {
    return applyDecorators(
        ApiOperation({
            
            summary: "Actualizacion de lo sdatos del usuario",
            description:"Permite a un nuevo jugador registrarse en la plataforma a partir de su cuenta de google."
        }),
        ApiResponse({status:201, description: "usuario registrado con exito"}),
        ApiResponse({status: 400, description: "El nombre no corresponde al email asociado"})
    )
}

export function SwaggerMakeMeAdmin() {
    return applyDecorators(
        ApiOperation({
            
            summary: "Convertir usuario en Administrador",
            description:"Permite a un usuario solicitar el permiso de admin a travez de una key"
        }),
        ApiResponse({status:201, description: "devuelve un objeto user con el rol modificado"}),
        ApiResponse({status: 404, description: "Not found exception"})
    )
}

export function SwaggerUpadeCategory() {
    return applyDecorators(
        ApiOperation({
            
            summary: "Convertir usuario en Administrador",
            description:"Permite a un usuario solicitar el permiso de admin a travez de una key"
        }),
        ApiResponse({status:201, description: "devuelve un objeto user con el rol modificado"}),
        ApiResponse({status: 404, description: "Not found exception"})
    )
}