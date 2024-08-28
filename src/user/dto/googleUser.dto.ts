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

@Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
@Length(8, 15)
@IsOptional()
    password?: string;

@Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
@Length(8, 15)
@IsOptional()
    passwordConfirm?: string;

@Length(5, 20)
@IsOptional()
    phone?: string;

@IsOptional()
@Length(3, 50)
@IsString()
    country?: string;

@IsOptional()
@Length(3, 50)
@IsString()
    city?: string;

@IsOptional()
@Length(3, 50)
@IsString()
    address?: string;

@IsOptional()
@IsString()
@Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
    category?: string;
}