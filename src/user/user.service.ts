import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as data from '../seed/users.json';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class UserService {
  
constructor(
  @InjectRepository(User) private userRepository:Repository<User>,
  @InjectRepository(Category) private categoryRepository:Repository<Category>
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

  async preloadUsers(){
    const categoriesFromDb = await this.categoryRepository.find()
    if(!categoriesFromDb.length){
      throw new BadRequestException("Debes precargar las categorias antes que los usuarios")
    }
    const checkUserDb = await this.userRepository.find()
    if(checkUserDb.length > 0){
      return {message: "Ya hay usuarios cargados en la Base de datos"}
    }
    for(const user of data){
      const userCategory = await this.categoryRepository.findOne({where:{name:user.category}})
      if(!userCategory){
        throw new BadRequestException("La precarga debe hacerse con categorias definidas")
      }
      const userFromDb = await this.userRepository.findOne({where: {email: user.email}})
      if(!userFromDb){
        await this.userRepository.save({...user, category:categoriesFromDb[0]});
      } 
    }
    return {message: "Usuarios precargados correctamente"};
  }
}

