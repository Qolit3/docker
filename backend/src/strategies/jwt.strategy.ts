import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { UsersService } from '../users/users.service'
import { IJwtPayload } from './IJwtPayload'
import { Inject, UnauthorizedException, Injectable } from '@nestjs/common'
import { User } from '../users/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService
  ) {
    super({
      secretOrKey: 'sercret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    })
  }
  async validate(payload: IJwtPayload): Promise<User> {
    const { userId } = payload
    const user = this.usersService.getByUserId(userId)
    
    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }
}
