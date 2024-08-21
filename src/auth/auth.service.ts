import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as Bcrypt from 'bcrypt'


@Injectable()
export class AuthService {
  constructor (
    private readonly JWTservice: JwtService
  ) {}

  signInUser(credentials: any) {
    const userExist = {id: 1, email: 'mail@mail.com', password: 'password123'}//metodo findOne()
    const passwordComparation = Bcrypt.compare(
      credentials.password, 
      userExist.password
    )
    if(userExist){
      if(passwordComparation){
        const userPayload = {
          sub: userExist.id,
          id: userExist.id,
          email: userExist.email,
          roles: ['user']//cambiar esto tambien cuando esten listo los guardianes
        }
        const token = this.JWTservice.sign(userPayload);
        return {message: 'Inicio de sesion realizado con exito', token}
      }else{
        throw new BadRequestException('Email o contraseña incorrectos')
      }
    }else {
      throw new BadRequestException('Email o contraseña incorrectos')
    }
  }
  async signUpUser(UserDto: any) {
    const emailAlreadyExist = 'findOne({where:{email:UserDto.email}})'

    if(!emailAlreadyExist){
      if(UserDto.password === UserDto.passwordConfirmation) {
        const encryptedPassword = await Bcrypt.hash(UserDto.password, 10)
        const newUser = 'save({...UserDto, password: encryptedPassword})'
        return {message: `Usuario creado con exito`}//ver que info necesita el front para retornarla
      }else{
        throw new BadRequestException('Las contraseñas deben ser iguales')
      }
    }else{
      throw new BadRequestException('El email provisto ya está registrado');
    }    
  }
}
