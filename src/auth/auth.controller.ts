import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordsCompare } from 'src/decorators/EqualPasswords';
import { CredentialsDto, UserDto } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(201)
  @Post('/signin')
  signIn(@Body() credentials:CredentialsDto) {
    return this.authService.signInUser(credentials)
  }

  @HttpCode(201)
  @Post('/signup')
  SignUp (@PasswordsCompare() UserDto:UserDto) {
    return this.authService.signUpUser(UserDto)
  }
}


