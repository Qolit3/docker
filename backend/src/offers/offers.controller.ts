import { Controller, UseGuards, Get, Post, Body, Param, Req, UseFilters } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { YandexGuard } from 'src/guards/yandex-guard';
import { LocalGuard } from 'src/guards/local-guard';
import { JwtGuard } from 'src/guards/jwt-guard';
import { OfferOnOwnWishExceptionFilter } from 'src/exceptions-intreceptors/filters/offer-on-own-wish-exception-filter';
import { OfferMoreThanWishPriceExceptionFilter } from 'src/exceptions-intreceptors/filters/offer-more-than-wish-price-exception-filter';


@Controller('offers')
@UseFilters(OfferOnOwnWishExceptionFilter)
@UseFilters(OfferMoreThanWishPriceExceptionFilter)
export class OffersController {
  constructor(
    private readonly offersService: OffersService
  ) {}

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Post()
  async create(@Body() createOfferDto: CreateOfferDto, @Req() req) {
    return this.offersService.create(createOfferDto, req.user.id)
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(+id);
  }
}
