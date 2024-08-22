import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
//import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
constructor(
  @InjectRepository(User) private userRepository:Repository<User>
){}

  create(createUserDto: UserDto) {
    return 'This action adds a new user';
  }

  async getAllUsers():Promise<User[]> {
    const users:User[] = await this.userRepository.find()
    if(!users.length) {
      throw new NotFoundException("No se encontraron usuarios")
    }
    return users
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
