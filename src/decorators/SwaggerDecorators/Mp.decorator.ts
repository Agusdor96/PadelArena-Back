import { applyDecorators } from "@nestjs/common"
import { ApiOperation, ApiResponse } from "@nestjs/swagger"

export function SwaggerCreatePreference() {
    return applyDecorators(
        ApiOperation({
            summary: "Crear la url de redireccion a mercado pago",
            description:"Este endpoint recibe el id de un torneo, de un usuario y un host donde se redirigirá a los usuarios despues de realizar el pago"
        }),
        ApiResponse({status: 201, description: "String donde se encuentra la url"}),
        ApiResponse({status: 400, description: "BadRequestException"}),
        ApiResponse({status: 404, description: "NotFoundException"})
    )
}
export function SwaggerFeedback() {
    return applyDecorators(
        ApiOperation({
            summary: "NO utilizar manualmente",
            description:"Este endpoint es en el que se comunica el webhook de mercado pago para poder informar sobre el estado de los pagos y actualizarlos. Solamente debe ser configurada en la configuracion de webhook en la interfaz de mercado pago."
        }),
        ApiResponse({status: 200, description: "Retorna el pago con la relacion con el usuario y el tonreo"}),
        ApiResponse({status: 201, description: "Retorna el pago con la relacion con el usuario y el tonreo"}),
        ApiResponse({status: 404, description: "NotFoundException"})
    )
}
export function SwaggerInscriptionStatus() {
    return applyDecorators(
        ApiOperation({
            summary: "Actualizar el estado de la inscripcion del usuario",
            description:"Recibe un id por parametro correspondiente al pago sobre el cual se quiere actualizar el estado de inscripcion del usuario. Seria ideal para ejecutarlo en el momento en que el usuario logra registrar al equipo despues de realizar el pago."
        }),
        ApiResponse({status: 201, description: "El estado de la inscripcion en el pago fue actualizado con exito"}),
        ApiResponse({status: 404, description: "NotFoundException"}),
        ApiResponse({status: 409, description: "No se logro actualizar el estado de la inscripcion en el pago"})

    )
}
export function SwaggerGetAllPayments() {
    return applyDecorators(
        ApiOperation({
            summary: "Obtener todos los pagos",
            description:"**ORGANIZADOR.** Este endpoint es ideal para obtener todos los pagos de la aplicacion independientemente de su estado o su gestor. Solo trae la relacion con el usuario, no con el torneo."
        }),
        ApiResponse({status: 200, description: "Array de pagos"}),
        ApiResponse({status: 404, description: "No se encuentran pagos concretados en la BDD"})
    )
}
export function SwaggerByTournament() {
    return applyDecorators(
        ApiOperation({
            summary: "Obtener todos los pagos referentes a un torneo",
            description:"**ORGANIZADOR.** Este endpoint recibe por parametro el id de un torneo y retorna todos los pagos gestionados para el mismo pero no trae la relacion con los usuarios."
        }),
        ApiResponse({status: 200, description: "Array de pagos"}),
        ApiResponse({status: 404, description: "NotFoundException"})
    )
}
export function SwaggerByUser() {
    return applyDecorators(
        ApiOperation({
            summary: "Obtener los pagos de un usuario",
            description:"Este endpoint recibe por parametro el id del usuario sobre el cual se quiere obtener la informacion pero no retorna la relacion con el torneo"
        }),
        ApiResponse({status: 200, description: "Array de pagos"}),
        ApiResponse({status: 404, description: "NotFoundException"})
    )
}