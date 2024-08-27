import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString, Length, Matches, MaxLength, MinLength} from "class-validator";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";


export class GoogleUserDto{



@ApiProperty({ description: 'User name', example: 'Matias Lopez' })
@IsNotEmpty()
@IsString()
@Length(3, 80)
name:string;

@ApiProperty({ description: 'User email', example: 'mati@gmail.com' })
@IsNotEmpty()
@IsEmail()
@IsString()
email:string;

image:File
}