import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function SwaggerGoogleAuth() {
    return applyDecorators(
        ApiOperation({
            
            summary: "Registro e inicio de sesion de usuario con google",
            description:"Permite a un nuevo jugador registrarse en la plataforma a partir de su cuenta de google. Se guardara su nombre y su email proveniente de google. Automaticamente se iniciara sesion. Si se registro anteriormente simplemente se iniciara sesion. No podra sin embargo, iniciar sesion con la autenticacion propia ya que no cuenta con una password definida."
        }),
        ApiResponse({status:201, description: "usuario registrado con exito"}),
        ApiResponse({status: 400, description: "El nombre no corresponde al email asociado"})
    )
}
export function SwaggerLocalSignUp() {
    return applyDecorators(
        ApiOperation({
            
            summary: "Registro de usuario propio",
            description:"Permite a un nuevo jugador registrarse en la plataforma proporcionando la informacion solicitada."
        }),
        ApiResponse({status:201, description: "usuario creado con exito y un objeto usuario sin la contraseña y sin la propiedad Rol"}),
        ApiResponse({status: 400, description: "Debes inscribirte dentro de una de las categorias definidas || El email provisto ya está registrado"})
    )
}
export function SwaggerLocalSignIn() {
    return applyDecorators(
        ApiOperation({
            
            summary: "Inicio de sesion del usuario a partir del registro propio",
            description:"Permite a un usuario iniciar sesion en la plataforma proporcionando las credenciales con las que se registro. Si el usuario se registro con google, debe iniciar sesion con google."
        }),
        ApiResponse({status:201, description: "Inicio de sesion realizado con exito, el token que se le genera a ese usuario y un objeto usuario sin la contraseña"}),
        ApiResponse({status: 400, description: "BadRequestException"})
    )
}