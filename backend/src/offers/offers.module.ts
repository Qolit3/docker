import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { Offer } from './entities/offer.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { PassportModule } from '@nestjs/passport'
import { YandexStrategy } from 'src/passport-strategys/yandex-strategy';
import { LocalStrategy } from 'src/passport-strategys/local-strategy';
import { JwtStrategy } from 'src/passport-strategys/jwt-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), PassportModule],
  controllers: [OffersController],
  providers: [OffersService, WishesService, JwtStrategy, LocalStrategy, YandexStrategy]
})
export class OffersModule {}
