import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as data from '../seed/users.json';
import { Category } from 'src/category/entities/category.entity';
import { GoogleUserDto } from './dto/googleUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UpdateUserCategoryDto } from './dto/userCategory.dto';

@Injectable()
export class UserService {
constructor(
  @InjectRepository(User) private userRepository:Repository<User>,
  @InjectRepository(Category) private categoryRepository:Repository<Category>
){}

  async getAllUsers():Promise<User[]> {
    const users:User[] = await this.userRepository.find({relations:{category:true}})
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

  async createNewUser(googleUser: GoogleUserDto) {
    const {email} = googleUser;
    const nameParts = googleUser.name.split(" ")
    const name = nameParts[0]
    const lastName = nameParts.slice(1).join(" ")
    
    const user = {
      name,
      lastName,
      email,
    }
    await this.userRepository.save(user)
    const createdUser = await this.userRepository.findOne({where:{email:email}})
    const {password, ...withoutPassword} = createdUser;
    return{message: "El usuario ha sido creado con existo", createdUser}
  }

  async updateUserCategory(userId: string, modifyCategory:UpdateUserCategoryDto) {
    const user = await this.userRepository.findOne({where: {id:userId}, relations: {category:true}})
    if(!user) throw new NotFoundException("No se encuentra usuario con el id proporcionado")
    if(user.category.id === modifyCategory.category) throw new BadRequestException("La categoria seleccionada es la que esta asignada actualmente")
    
    const newCategory = await this.categoryRepository.findOne({where: {id:modifyCategory.category}})
    
    const newUserCategory = {
      ...user,
      category: newCategory
    }

    await this.userRepository.update(userId, newUserCategory)
    const updatedUser = await this.userRepository.findOne({where:{id:userId}, relations:{category:true}})
    
    console.log("3", updatedUser);
    return {message: "La categoria del usuario se actualizo correctamente", updatedUser}
  }  

 async updateUserProfile(userId: string, modifiedUser: UpdateUserDto) {
    const userToUpdate = await this.userRepository.findOneBy({id:userId})
    if(!userToUpdate){
      throw new NotFoundException("No se encontro usuario con el Id proporcionado")
    }
    
    
    const category = await this.categoryRepository.findOne({where:{name:modifiedUser.category}})
    
    const updatedUser = {
      ...modifiedUser,
      category: category
    }
    
     await this.userRepository.update(userId, updatedUser)
     const newUser = await this.userRepository.findOneBy({id:userId})
     return {message:"La informacion del usuario se actualizo correctamente", newUser}
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
        await this.userRepository.save({...user, category: userCategory});
      } 
    }
    return {message: "Usuarios precargados correctamente"};
  }
}

