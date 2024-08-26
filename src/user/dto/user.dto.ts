import { PickType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Length, Matches } from "class-validator";

export class UserDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @Length(3, 50)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
  @Length(8, 15)
  @IsNotEmpty()
  password: string;

  @Matches(/^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/)
  @Length(8, 15)
  @IsNotEmpty()
  passwordConfirm: string;

  @IsNotEmpty()
  @Length(5, 20)
  phone: string;

  @IsNotEmpty()
  @Length(3, 50)
  @IsString()
  country: string;

  @IsNotEmpty()
  @Length(3, 50)
  @IsString()
  city: string;

  @IsNotEmpty()
  @Length(3, 50)
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 50, { message: 'El nombre debe tener entre 2 y 50 caracteres' })
  category: string;

  @IsOptional()
  @Length(3, 50)
  @IsString()
  profileImg: string | undefined;
}

export class CredentialsDto extends PickType(UserDto, ['email', 'password']){}
