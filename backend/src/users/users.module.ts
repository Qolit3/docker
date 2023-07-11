import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from 'src/passport-strategys/jwt-strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from 'src/constants/constants';
import { LocalStrategy } from 'src/passport-strategys/local-strategy';
import { YandexStrategy } from 'src/passport-strategys/yandex-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: jwtConstant
      })
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, LocalStrategy, YandexStrategy]
})
export class UsersModule {}
