
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length, Matches } from "class-validator";

export class UserDto {
  @ApiProperty({ description: 'Nombre del jugador', example: 'Matias' })
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @ApiProperty({ description: 'Apellido del jugador', example: 'Lopez' })
  @IsNotEmpty()
  @Length(3, 50)
  lastName: string;

  @ApiProperty({ description: 'Email del jugador', example: 'mati@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Contraseña del jugador', example: 'Hola1234#' })
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
  @Length(8, 15)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Debe coincidir con la contraseña', example: 'Hola1234#' })
  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
  @Length(8, 15)
  @IsNotEmpty()
  passwordConfirm: string;

  @ApiProperty({ description: 'Telefono del jugador', example: '1157849758' })
  @IsNotEmpty()
  @Length(5, 20)
  phone: string;

  @ApiProperty({ description: 'Pais del jugador', example: 'Argentina' })
  @IsNotEmpty()
  @Length(3, 50)
  @IsString()
  country: string;

  @ApiProperty({ description: 'Ciudad del jugador', example: 'Carmen de Patagones' })
  @IsNotEmpty()
  @Length(3, 50)
  @IsString()
  city: string;

  @ApiProperty({ description: 'Direccion del jugador', example: 'Calle falsa 1234' })
  @IsNotEmpty()
  @Length(3, 50)
  @IsString()
  address: string;

  @ApiProperty({ description: 'Categoria del jugador', example: 'c468029f-e9c2-4176-8ab4-357aeae441a7' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  category: string;

  @ApiProperty({ description: 'Imagen de perfil del jugador', example: 'ejemplo.jpg' })
  @IsOptional()
  @Length(3, 50)
  @IsString()
  profileImg: string | undefined;
}


