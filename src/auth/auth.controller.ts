import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordsCompare } from 'src/decorators/EqualPasswords';
import { UserDto } from 'src/user/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GoogleUserDto } from 'src/user/dto/googleUser.dto';
import { SwaggerGoogleAuth, SwaggerLocalSignIn, SwaggerLocalSignUp } from 'src/decorators/AuthSwagger.decorator';
import { CredentialsDto } from 'src/user/dto/credential.dto';

@ApiTags("AUTH")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(201)
  @Post('/local-signup')
  @SwaggerLocalSignUp()
  signUp (
    @PasswordsCompare()
    @Body() userDto:UserDto) {
    return this.authService.signUpUser(userDto)
  }

  @HttpCode(201)
  @Post('/local-signin')
  @SwaggerLocalSignIn()
  signIn(@Body() credentials:CredentialsDto) {
    return this.authService.signInUser(credentials)
  }

  @Post("google-sign")
  @SwaggerGoogleAuth()
  signGoogle(@Body() googleUser:GoogleUserDto){
    return this.authService.authGoogleSign(googleUser);
  }
}


