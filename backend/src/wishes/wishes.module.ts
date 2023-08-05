import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { WishesController } from './wishes.controller'
import { Wish } from './wish.entity'
import { WishesService } from './wishes.service'

@Module({
  imports: [TypeOrmModule.forFeature([Wish])],
  controllers: [WishesController],
  providers: [WishesService],
  exports: [WishesService],
})

export class WishesModule {}