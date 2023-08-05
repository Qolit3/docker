import { Inject, UnauthorizedException, Injectable  } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/createUserDto'
import * as bcrypt from 'bcrypt'
import { SigninUserDto } from '../users/dto/signinUserDto'
import { IJwtPayload } from 'src/strategies/IJwtPayload'
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto)
  }

  async signIn(
    signinUserDto: SigninUserDto,
  ): Promise<{ access_token: string }> {

    const { username, password } = signinUserDto
    const user = await this.usersService.getUserPrivateInfo(username)
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: IJwtPayload = { userId: user.id }
      const access_token: string = this.jwtService.sign(payload)

      return { access_token }
    } else {
      throw new UnauthorizedException('Неверные логин или пароль')
    }
  }
}
