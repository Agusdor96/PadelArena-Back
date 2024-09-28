import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordsCompare } from '../decorators/EqualPasswords.decorator';
import { UserDto } from '../user/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GoogleUserDto } from '../user/dto/googleUser.dto';
import { SwaggerGoogleAuth, SwaggerLocalSignIn, SwaggerLocalSignUp } from '../decorators/SwaggerDecorators/Auth.decorator';
import { CredentialsDto } from '../user/dto/credential.dto';

@ApiTags("AUTENTICACION")
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


