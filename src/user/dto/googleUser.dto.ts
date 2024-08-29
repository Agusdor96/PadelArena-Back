import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Matches, MaxLength, MinLength} from "class-validator";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";


export class GoogleUserDto{

@ApiProperty({ description: 'Nombre del jugador', example: 'Matias Lopez' })
@IsNotEmpty()
@IsString()
@Length(3, 80)
    name:string;

@ApiProperty({ description: 'Mail del jugador', example: 'mati@gmail.com' })
@IsNotEmpty()
@IsEmail()
@IsString()
    email:string;

@IsOptional()
    image:string

@IsOptional()
@Length(3, 50)
    lastName?: string;
}