import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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
}
