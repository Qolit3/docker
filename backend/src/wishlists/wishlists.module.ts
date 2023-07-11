import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { WishlistsService } from './wishlists.service';
import { WishlistsController } from './wishlists.controller';
import { Wishlist } from './entities/wishlist.entity';
import { PassportModule } from '@nestjs/passport'
import { YandexStrategy } from 'src/passport-strategys/yandex-strategy';
import { LocalStrategy } from 'src/passport-strategys/local-strategy';
import { JwtStrategy } from 'src/passport-strategys/jwt-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist]), PassportModule],
  controllers: [WishlistsController],
  providers: [WishlistsService, JwtStrategy, LocalStrategy, YandexStrategy]
})
export class WishlistsModule {}
