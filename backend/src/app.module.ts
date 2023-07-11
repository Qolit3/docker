import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config'
import { PassportModule } from '@nestjs/passport'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5442,
      username: 'student',
      password: 'student',
      database: 'nest_project',
      entities: [],
      synchronize: true
    }),
    ConfigModule.forRoot({ isGlobal: true, load: [configuration]}),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}