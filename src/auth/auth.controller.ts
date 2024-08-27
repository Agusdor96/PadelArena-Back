import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordsCompare } from 'src/decorators/EqualPasswords';
import { CredentialsDto, UserDto } from 'src/user/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GoogleUserDto } from 'src/user/dto/googleUser.dto';
import { SwaggerGoogleAuth } from 'src/decorators/AuthSwagger.decorator';

@ApiTags("AUTH")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(201)
  @Post('/signup')
  signUp (@PasswordsCompare() userDto:UserDto) {
    return this.authService.signUpUser(userDto)
  }

  @HttpCode(201)
  @Post('/signin')
  signIn(@Body() credentials:CredentialsDto) {
    return this.authService.signInUser(credentials)
  }

  @Post("google")
  @SwaggerGoogleAuth()
  signGoogle(@Body() googleUser:GoogleUserDto){
    return this.authService.authGoogleSign(googleUser);
  }
}


