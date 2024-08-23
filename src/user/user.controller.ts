import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { PasswordInterceptor } from './interceptor/user.interceptor';
//import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: UserDto) {
    return this.userService.create(createUserDto);
  }

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
