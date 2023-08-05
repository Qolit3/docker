import {
  Controller,
  Body,
  Get,
  Delete,
  Patch,
  Param,
  UseGuards,
  Post,
} from '@nestjs/common'
import { WishesService } from './wishes.service'
import { Wish } from './wish.entity'
import { CreateWishDto } from './dto/createWishDto'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../decorators/getUser.decorator'
import { User } from '../users/user.entity'
import { UpdateWishDto } from './dto/updateWishDto'

@Controller('wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}

  @Get()
  getAllWishes(): Promise<Wish[]> {
    return this.wishesService.getAllWishes()
  }

  @Get('last')
  getLast(): Promise<Wish[]> {
    return this.wishesService.getLastWishes()
  }
  @Get('top')
  getTop(): Promise<Wish[]> {
    return this.wishesService.getTopWishes()
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getWishById(@Param('id') id: string): Promise<Wish> {
    return this.wishesService.getWishById(Number.parseInt(id))
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createWish(
    @Body() createWishDto: CreateWishDto,
    @GetUser() user: User,
  ): Promise<Wish> {
    return this.wishesService.createWish(createWishDto, user)
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  updateWish(
    @Param('id') wishId: number,
    @GetUser() user: User,
    @Body() updateWishDto: UpdateWishDto,
  ): Promise<Wish> {
    return this.wishesService.updateWish(wishId, user, updateWishDto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  deleteWish(
    @Param('id') wishId: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    return this.wishesService.removeWish(wishId, user)
  }

  @Post(':id/copy')
  @UseGuards(AuthGuard('jwt'))
  copyWish(@Param('id') wishId: number, @GetUser() user: User): Promise<Wish> {
    return this.wishesService.copyWish(wishId, user)
  }
}
