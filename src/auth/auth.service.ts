import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { Category } from 'src/category/entities/category.entity';
import { GoogleUserDto } from 'src/user/dto/googleUser.dto';
import { CredentialsDto, UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
 
  constructor (
    @InjectRepository(User)private userRepository: Repository<User>,
    @InjectRepository(Category) private categoryRepository:Repository<Category>,
    @Inject() private userService:UserService,
    private readonly JWTservice: JwtService
  ) {}

  async signUpUser(userDto: UserDto) {
    const emailAlreadyExist = await this.userRepository.findOne({where:{email:userDto.email}})
    const category = await this.categoryRepository.findOne({where: {id:userDto.category}});

    if(emailAlreadyExist){
      throw new BadRequestException('El email provisto ya está registrado')
    } else if(!category){
          throw new BadRequestException("Debes inscribirte dentro de una de las categorias definidas")
      }

      const encryptedPassword = await bcrypt.hash(userDto.password, 10)
      
      const newUser = {
        ...userDto,
        category: category
      }

      const user = await this.userRepository.save({...newUser, password: encryptedPassword})
      const {password, passwordConfirm, role, ...desestructuredUser} = user
        
      return {message: 'Usuario creado con exito', desestructuredUser}
  }
  
  async signInUser(credentials: CredentialsDto) {
    const userExist = await this.userRepository.findOne({where:{email:credentials.email}})
      if(!userExist){
        throw new BadRequestException('Email o contraseña incorrectos')
      }
      
    const passwordComparation = await bcrypt.compare(credentials.password, userExist.password)

    
      if(!passwordComparation){
        throw new BadRequestException('Email o contraseña incorrectos')
      }
      
      const userPayload = {
        sub: userExist.id,
        id: userExist.id,
        email: userExist.email,
        role: userExist.role 
      }

        const token = this.JWTservice.sign(userPayload);
        const {password, ...userClean} = userExist

      return {message: 'Inicio de sesion realizado con exito', token, userClean}
  }

  async authGoogleSign(googleUser:GoogleUserDto) {
    const {email} = googleUser;
    const nameParts = googleUser.name.split(" ")
    const name = nameParts[0]
    const lastName = nameParts.slice(1).join(" ")
    
    
    const googleUserFromDb = await this.userRepository.findOne({where:{email:email}})
  
    if(googleUserFromDb){
      if(googleUserFromDb.name !== name || googleUserFromDb.lastName !== lastName){
        throw new BadRequestException("Nombre o Apellido no corresponde al email asociado")
      }
      const userPayload = {
        sub: googleUserFromDb.id,
        id: googleUserFromDb.id,
        email: googleUserFromDb.email,
        role: googleUserFromDb.role 
      }

        const token = this.JWTservice.sign(userPayload);
        const { password, role, ...googleUserWithoutPassword} = googleUserFromDb

      return {message: 'Inicio de sesion realizado con exito', token, googleUserWithoutPassword}
    } else if(!googleUserFromDb){

        const newUser = await this.userService.createNewUser(googleUser)
        const newGoogleUser = newUser.withoutPassword

        if(newGoogleUser){
          const userPayload = {
            sub: newGoogleUser.id,
            id: newGoogleUser.id,
            email: newGoogleUser.email,
            role: newGoogleUser.role 
          }
          const token = this.JWTservice.sign(userPayload);

          return {message: 'Registro e inicio de sesion realizado con exito', token, newGoogleUser}
        }
    }
  }
}
