import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { WishlistsController } from './wishlists.controller'
import { Wishlist } from './wishlist.entity'
import { WishesModule } from '../wishes/wishes.module'
import { WishlistsService } from './wishlists.service'

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist]), WishesModule],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export class WishlistsModule {}
