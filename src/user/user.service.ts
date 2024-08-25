import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as data from '../seed/users.json';

@Injectable()
export class UserService {
  
constructor(
  @InjectRepository(User) private userRepository:Repository<User>
){}

  async getAllUsers():Promise<User[]> {
    const users:User[] = await this.userRepository.find()
    if(!users.length) {
      throw new NotFoundException("No se encontraron usuarios")
    }
    return users
  }

  async getUsersByCategory(categoryId: string) {
    const usersFromOneCategory = await this.userRepository.findBy({
      category: {
        id:categoryId
      }
    })

    if(!usersFromOneCategory.length){
      throw new NotFoundException("No se encuentran jugadores en la categoria proporcionada")
    }
    return usersFromOneCategory;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({id:id})
      if(!user){
        throw new NotFoundException("No se encuentra usuario con el id proporcionado")
      }
    return user;
  }

  async preload(){
    const checkUserDb = await this.userRepository.find()
    if(checkUserDb.length > 0){
      return {message: "Los usuarios ya estan cargados en la Base de datos"}
    }
    
    for(const user of data){
      const exist = await this.userRepository.findOne({where: {email: user.email}})

      if(!exist) await this.userRepository.save(user);
      else{
        continue;
      }
    }
    return {message: "Usuarios precargados correctamente"};
  }
}
