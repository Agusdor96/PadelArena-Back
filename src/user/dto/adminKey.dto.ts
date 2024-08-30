import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AdminKeyDto{
    @ApiProperty({ description: 'Esta clave cambia el rol de un usuario "jugador" a usuario ADMINISTRADOR'})
    @IsNotEmpty()
    @IsString()
    secretKey:string
}