import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function SwaggerGetAllUsers() {
    return applyDecorators(
        ApiOperation({
            
            summary: "Obtener una lista de todos los usuarios registrados",
            description:"**ORGANIZADOR**. Obtiene una lista de todos los usuarios registrados"
        }),
        ApiResponse({status:201, description: "Devuelve un array con todos los usuarios sin su contraseña"}),
        ApiResponse({status: 404, description: "Not found exception"})
    )
}

export function SwaggerGetUsersByCategory() {
    return applyDecorators(
        ApiOperation({
            
            summary: "Obtiene a todos los usuarios de una categoria especifica",
            description:"Obtiene a todos los usuarios de una categoria especifica"
        }),
        ApiResponse({status:201, description: "Un array de objetos user"}),
        ApiResponse({status: 404, description: "NotFoundException"})
    )
}

export function SwaggerMakeMeAdmin() {
    return applyDecorators(
        ApiOperation({
            summary: "Actualiza el rol de un usuario `JUGADOR` a `ADMIN`",
            description:"**ORGANIZADOR**. Permite a un usuario solicitar el rol de admin a travez de una key"
        }),
        ApiResponse({status:201, description: "Devuelve un objeto user con el rol modificado"}),
        ApiResponse({status: 404, description: "Not found exception"})
    )
}

export function SwaggerUpdateUser() {
    return applyDecorators(
        ApiOperation({
            summary: "Actualizacion de los datos del usuario",
            description:"Este endpoint se utiliza para que un usuario pueda actualizar sus datos, o completarlos en caso de que se haya registrado con google."
        }),
        ApiResponse({status:201, description: "Un objeto usuario con sus datos actualizados"}),
        ApiResponse({status: 400, description: "NotFoundException"})
    )
}

export function SwaggerUpdateUserCategory() {
    return applyDecorators(
        ApiOperation({
            
            summary: "Actualizar la categoria de un usuario",
            description:"**ORGANIZADOR**. La logica de la aplicacion es que el usuario unicamente seleccione su categoria al registrarse y luego unicamente el administrador sea quien decide modificar la categoria de los jugadores."
        }),
        ApiResponse({status: 201, description: "Un objeto usuario"}),
        ApiResponse({status: 400, description: "BadRequestException"}),
        ApiResponse({status: 404, description: "NotFoundException"})
    )
}

export function SwaggerGetUsersFromTournament() {
    return applyDecorators(
        ApiOperation({
            
            summary: "Obtiene a un usuario jugador de un torneo especifico",
            description:"Accede a la informacion de un usuario que participa de un torneo en particular"
        }),
        ApiResponse({status:201, description: "Devuelve un objeto user con la relacion que tiene con: la categoria, los equipos en los que  participo y los torneos en lo que participo"}),
        ApiResponse({status: 404, description: "NotFoundException"})
    )
}

export function SwaggerGetOneUser() {
    return applyDecorators(
        ApiOperation({
            
            summary: "Obtiene un usuario por Id",
            description:"Se obtiene un usuario por su id, idealmente se usaria para el perfil del usuario"
        }),
        ApiResponse({status:201, description: "Devuelve un objeto user"}),
        ApiResponse({status: 404, description: "NotFoundException"})
    )
}