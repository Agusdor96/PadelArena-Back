import { Body, Controller, Get, Param, ParseUUIDPipe, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { PasswordInterceptor } from '../interceptors/passwords.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleEnum } from './roles.enum';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/updateUser.dto';
import { SwaggerUpdateUser } from 'src/decorators/UserSwagger.decorator';
import { UpdateUserCategoryDto } from './dto/userCategory.dto';

@ApiTags("USERS")
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  // @Roles(RoleEnum.ADMIN)
  // @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(PasswordInterceptor)
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Get('category/:categoryId')
  // @UseGuards(AuthGuard)
  @UseInterceptors(PasswordInterceptor)
  getUsersBy(@Param('categoryId', ParseUUIDPipe) categoryId: string) {
    return this.userService.getUsersByCategory(categoryId);
  }

  @Put("updateProfile/:userId")
  // @UseGuards(AuthGuard)
  @UseInterceptors(PasswordInterceptor)
  @SwaggerUpdateUser()
  updateUserProfile(
    @Param("userId", ParseUUIDPipe)userId:string, 
    @Body()modifiedUser:UpdateUserDto){        
        return this.userService.updateUserProfile(userId, modifiedUser)
      }

  @Put("updateCategory/:userId")
  // @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(PasswordInterceptor)
  updateUserCategory(
    @Param("userId", ParseUUIDPipe)userId:string, 
    @Body()modifyCategory:UpdateUserCategoryDto){        
      return this.userService.updateUserCategory(userId, modifyCategory)
      }

  @Get(':id')
  // @UseGuards(AuthGuard)
  @UseInterceptors(PasswordInterceptor)
  getOneUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

}
