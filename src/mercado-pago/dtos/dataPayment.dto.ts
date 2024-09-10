import { ApiProperty } from "@nestjs/swagger"
import {  IsNotEmpty, IsString, IsUUID } from "class-validator"

export class dataPaymentDto {
    @ApiProperty({description:"El id del torneo al que desea inscribirse", example:"a13810bb-161b-427f-9e55-e17cc354dcd5"})
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    tournament: string
    
    @ApiProperty({description:"el link al que se redirecciona luego de realizar el pago", example:"http://localhost:3000/tournament/register"})
    @IsNotEmpty()
    @IsString()
    host: string
    
    @ApiProperty({description:"El id del usuario que realiyara el pago", example:"40cc2c4d-65dc-4391-8bbe-8caa80f80f23"})
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    user:string
}
