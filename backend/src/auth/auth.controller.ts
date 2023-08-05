import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/createUserDto';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { SigninUserDto } from '../users/dto/signinUserDto';

@Controller('/')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signIn(
    @Body() signinUserDto: SigninUserDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(signinUserDto);
  }
}
