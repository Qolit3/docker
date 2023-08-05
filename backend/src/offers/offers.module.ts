import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { OffersController } from './offers.controller'
import { Offer } from './offer.entity'
import { WishesModule } from '../wishes/wishes.module'
import { OffersService } from './offers.service'

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), WishesModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
