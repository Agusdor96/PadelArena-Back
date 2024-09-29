import { Body, Controller, Get, Param, ParseUUIDPipe, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { PasswordInterceptor } from '../interceptors/passwords.interceptor';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { RoleEnum } from './roles.enum';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/updateUser.dto';
import { SwaggerUpdateUser,SwaggerMakeMeAdmin, SwaggerUpdateUserCategory, SwaggerGetAllUsers, SwaggerGetUsersByCategory, SwaggerGetUsersFromTournament, SwaggerGetOneUser } from '../decorators/SwaggerDecorators/User.decorator';
import { UpdateUserCategoryDto } from './dto/userCategory.dto';
import { AdminKeyDto } from './dto/adminKey.dto';
import { UserIdINterceptor } from '../interceptors/userId.interceptor';
import { CustomGetAllUsers, CustomGetUser, CustomGetUsersFromTournament, CustomUpdateUserCategory, CustomUpdateUserProfile, CustomUpdateUserRole, CustomUsersFromCategory } from 'src/decorators/controllerDecorators/userController.decorator';

@ApiTags("USUARIOS")
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @CustomGetAllUsers()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Get('category/:categoryId')
  @CustomUsersFromCategory()
  getUsersBy(@Param('categoryId', ParseUUIDPipe) categoryId: string) {
    return this.userService.getUsersByCategory(categoryId);
  }

  @Put("makeMeAdmin/:userId")
  @CustomUpdateUserRole()
  updateUserRole(
    @Param("userId", ParseUUIDPipe)userId:string,
    @Body()adminKey:AdminKeyDto){
      return this.userService.updateUserRole(userId, adminKey)
    }
    
  @Put("updateProfile/:userId")
  @CustomUpdateUserProfile()
  updateUserProfile(
    @Param("userId", ParseUUIDPipe)userId:string, 
    @Body()modifiedUser:UpdateUserDto){        
        return this.userService.updateUserProfile(userId, modifiedUser)
      }
  
  @Put("updateCategory/:userId")
  @CustomUpdateUserCategory()
  updateUserCategory(
    @Param("userId", ParseUUIDPipe)userId:string, 
    @Body()modifyCategory:UpdateUserCategoryDto){        
      return this.userService.updateUserCategory(userId, modifyCategory)
      }

  @Get('tournament/:userId')
  @CustomGetUsersFromTournament()
  getUserTournament(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.userService.getUserTournament(userId);
  }

  @Get(':id')
  @CustomGetUser()
  getOneUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }
}
