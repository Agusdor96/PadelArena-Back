import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordsCompare } from '../decorators/EqualPasswords.decorator';
import { UserDto } from '../user/dto/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GoogleUserDto } from '../user/dto/googleUser.dto';
import { CredentialsDto } from '../user/dto/credential.dto';
import { CustomGoogleSignIn, CustomLocalSignIn, CustomLocalSignUp } from 'src/decorators/controllerDecorators/authController.decorator';

@ApiTags("AUTENTICACION")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/local-signup')
  @CustomLocalSignUp()
  signUp (
    @PasswordsCompare()
    @Body() userDto:UserDto) {
    return this.authService.signUpUser(userDto)
  }

  @Post('/local-signin')
  @CustomLocalSignIn()
  signIn(@Body() credentials:CredentialsDto) {
    return this.authService.signInUser(credentials)
  }

  @Post("google-sign")
  @CustomGoogleSignIn()
  signGoogle(@Body() googleUser:GoogleUserDto){
    return this.authService.authGoogleSign(googleUser);
  }
}


