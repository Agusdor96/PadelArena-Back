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
  @Post('/local-signup')
  signUp (
    @PasswordsCompare()
    @Body() userDto:UserDto) {
    return this.authService.signUpUser(userDto)
  }

  @HttpCode(201)
  @Post('/local-signin')
  signIn(@Body() credentials:CredentialsDto) {
    return this.authService.signInUser(credentials)
  }

  @Post("google-sign")
  @SwaggerGoogleAuth()
  signGoogle(@Body() googleUser:GoogleUserDto){
    return this.authService.authGoogleSign(googleUser);
  }
}


