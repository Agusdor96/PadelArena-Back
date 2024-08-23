import { Controller, Get, Param, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { PasswordInterceptor } from '../interceptors/passwords.interceptor';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  @UseInterceptors(PasswordInterceptor)
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Get('category/:categoryId')
  @UseInterceptors(PasswordInterceptor)
  getUsersBy(@Param('categoryId', ParseUUIDPipe) categoryId: string) {
    return this.userService.getUsersByCategory(categoryId);
  }

  @Get(':id')
  @UseInterceptors(PasswordInterceptor)
  getOneUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

}
