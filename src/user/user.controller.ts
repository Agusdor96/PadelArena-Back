import { Body, Controller, Get, Param, ParseUUIDPipe, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { PasswordInterceptor } from '../interceptors/passwords.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleEnum } from './roles.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/updateUser.dto';
import { SwaggerUpdateUser,SwaggerMakeMeAdmin, SwaggerUpdateUserCategory, SwaggerGetAllUsers, SwaggerGetUsersByCategory, SwaggerGetUsersFromTournament, SwaggerGetOneUser } from 'src/decorators/SwaggerDecorators/User.decorator';
import { UpdateUserCategoryDto } from './dto/userCategory.dto';
import { AdminKeyDto } from './dto/adminKey.dto';
import { UserIdINterceptor } from 'src/interceptors/userId.interceptor';

@ApiTags("USUARIOS")
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get()
  @SwaggerGetAllUsers()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(PasswordInterceptor)
  getUsers() {
    return this.userService.getAllUsers();
  }

  @ApiBearerAuth()
  @Get('category/:categoryId')
  @SwaggerGetUsersByCategory()
  @UseGuards(AuthGuard)
  @UseInterceptors(PasswordInterceptor)
  getUsersBy(@Param('categoryId', ParseUUIDPipe) categoryId: string) {
    return this.userService.getUsersByCategory(categoryId);
  }

  @ApiBearerAuth()
  @Put("makeMeAdmin/:userId")
  @UseGuards(AuthGuard)
  @SwaggerMakeMeAdmin()
  updateUserRole(
    @Param("userId", ParseUUIDPipe)userId:string,
    @Body()adminKey:AdminKeyDto){
      return this.userService.updateUserRole(userId, adminKey)
    }
    
  @ApiBearerAuth()
  @Put("updateProfile/:userId") 
  @UseGuards(AuthGuard)
  @UseInterceptors(UserIdINterceptor)
  @SwaggerUpdateUser()
  updateUserProfile(
    @Param("userId", ParseUUIDPipe)userId:string, 
    @Body()modifiedUser:UpdateUserDto){        
        return this.userService.updateUserProfile(userId, modifiedUser)
      }
  
  @ApiBearerAuth()
  @Put("updateCategory/:userId")
  @SwaggerUpdateUserCategory()
  @Roles(RoleEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(PasswordInterceptor)
  updateUserCategory(
    @Param("userId", ParseUUIDPipe)userId:string, 
    @Body()modifyCategory:UpdateUserCategoryDto){        
      return this.userService.updateUserCategory(userId, modifyCategory)
      }

  @ApiBearerAuth()
  @Get('tournament/:userId')
  @SwaggerGetUsersFromTournament()
  @UseGuards(AuthGuard)
  @UseInterceptors(PasswordInterceptor)
  getUserTournament(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.userService.getUserTournament(userId);
  }

  @ApiBearerAuth()
  @Get(':id')
  @SwaggerGetOneUser()
  @UseGuards(AuthGuard)
  @UseInterceptors(PasswordInterceptor)
  getOneUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUserById(id);
  }

}
