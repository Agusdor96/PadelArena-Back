import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as Bcrypt from 'bcrypt'
import { CredentialsDto, UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly JWTservice: JwtService
  ) {}

  async signInUser(credentials: CredentialsDto) {
    const userExist = await this.userRepository.findOne({where:{email:credentials.email}})
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
          roles: ['user']  //cambiar esto tambien cuando esten listo los guardianes
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
  async signUpUser(UserDto: UserDto) {
    const emailAlreadyExist = await this.userRepository.findOne({where:{email:UserDto.email}})
    if(!emailAlreadyExist){
        const encryptedPassword = await Bcrypt.hash(UserDto.password, 10)
        const newUser = await this.userRepository.save({...UserDto, password: encryptedPassword})
        const {password, ...user} = newUser
        return {message: 'Usuario creado con exito', user}
    }else{
      throw new BadRequestException('El email provisto ya está registrado');
    }
  }
}
