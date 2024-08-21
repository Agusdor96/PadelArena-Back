import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(201)
  @Post('/signin')
  signIn(@Body() credentials:any) {
    return this.authService.signInUser(credentials)
  }

  @HttpCode(201)
  @Post('/signup')
  SignUp (@Body() UserDto:any) {
    return this.authService.signUpUser(UserDto)
  }
}
