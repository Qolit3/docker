import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { YandexGuard } from 'src/guards/yandex-guard';
import { LocalGuard } from 'src/guards/local-guard';
import { JwtGuard } from 'src/guards/jwt-guard';

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.create(createWishlistDto);
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistsService.findOne(+id);
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishlistDto: UpdateWishlistDto, @Req() req) {
    return this.wishlistsService.update(+id, updateWishlistDto, req.user.id);
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.wishlistsService.remove(+id, req.user.id);
  }
}
