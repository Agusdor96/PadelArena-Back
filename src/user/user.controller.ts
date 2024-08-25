import { Controller, Get, Param, ParseUUIDPipe, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { PasswordInterceptor } from '../interceptors/passwords.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleEnum } from './roles.enum';


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
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(PasswordInterceptor)
  getOneUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

}
