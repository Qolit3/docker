import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Wish } from './entities/wish.entity';
import { PassportModule } from '@nestjs/passport'
import { YandexStrategy } from 'src/passport-strategys/yandex-strategy';
import { LocalStrategy } from 'src/passport-strategys/local-strategy';
import { JwtStrategy } from 'src/passport-strategys/jwt-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Wish]), PassportModule],
  controllers: [WishesController],
  providers: [WishesService, JwtStrategy, LocalStrategy, YandexStrategy]
})
export class WishesModule {}
