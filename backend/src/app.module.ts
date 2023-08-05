import { AppController } from './app.controller'
import { Module } from '@nestjs/common'
import { Wishlist } from './wishlists/wishlist.entity'
import { Wish } from './wishes/wish.entity'
import { AuthModule } from './auth/auth.module'
import { Offer } from './offers/offer.entity'
import { UsersModule } from './users/users.module'
import { WishlistsModule } from './wishlists/wishlists.module'
import { User } from './users/user.entity'
import { OffersModule } from './offers/offers.module'
import { WishesModule } from './wishes/wishes.module'
import { TypeOrmModule } from '@nestjs/typeorm'

const  {
  HOST = 'postgres',
  PORT = '5432',
  DB = 'postgres',
  USER = 'postgres',
  PASSWORD = 'password'
} = proccess.env


@Module({
  imports: [
        TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: HOST,
      password: PASSWORD,
      username: USER,
      entities: [Offer, Wishlist, User, Wish],
      database: DB,
      synchronize: true,
    }),
    WishlistsModule,
    WishesModule,
    OffersModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})

export class AppModule {}