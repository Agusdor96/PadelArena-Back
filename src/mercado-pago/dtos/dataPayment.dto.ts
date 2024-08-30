import {  IsNotEmpty, IsString } from "class-validator"

export class dataPaymentDto {
    @IsNotEmpty()
    @IsString()
    tournament: string

    @IsNotEmpty()
    @IsString()
    host: string

    @IsNotEmpty()
    @IsString()
    user:string
}
