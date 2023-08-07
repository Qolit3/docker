import {
  Controller,
  Body,
  Get,
  Delete,
  Patch,
  Param,
  UseGuards,
  Post
} from '@nestjs/common'

import { AuthGuard } from '@nestjs/passport'
import { WishlistsService } from './wishlists.service'
import { GetUser } from '../decorators/getUser.decorator'
import { Wishlist } from './wishlist.entity'
import { User } from '../users/user.entity'
import { CreateWishlistDto } from './dto/createWishlistDto'
import { UpdateWishlistDto } from './dto/updateWishlistDto'

@Controller('wishlists')
@UseGuards(AuthGuard('jwt'))
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Get()
  getWishlists(): Promise<Wishlist[]> {
    return this.wishlistsService.getAlWishlists();
  }

  @Get(':id')
  getWishlistById(@Param('id') id: string): Promise<Wishlist> {
    return this.wishlistsService.getWishlistById(+id);
  }

  @Post()
  createWishlist(
    @GetUser() user: User,
    @Body() createWishlistDto: CreateWishlistDto,
  ): Promise<Wishlist> {
    return this.wishlistsService.createWishlist(createWishlistDto, user);
  }

  @Patch(':id')
  updateWishlist(
    @GetUser() user: User,
    @Body() updateWishlistDto: UpdateWishlistDto,
    @Param('id') id: string,
  ): Promise<Wishlist> {
    return this.wishlistsService.updateWishlist(user, +id, updateWishlistDto);
  }

  @Delete(':id')
  deleteWish(
    @Param('id') id: number,
    @GetUser() user: User,
  ): Promise<{ message: string }> {
    return this.wishlistsService.removeWishlist(user, +id);
  }
}
