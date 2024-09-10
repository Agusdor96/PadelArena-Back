import {  IsNotEmpty, IsString, IsUUID } from "class-validator"

export class dataPaymentDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    tournament: string

    @IsNotEmpty()
    @IsString()
    host: string

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    user:string
}
