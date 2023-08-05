import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateOfferDto } from './dto/createOfferDto';
import { Offer } from './offer.entity';
import { GetUser } from '../decorators/getUser.decorator';
import { OffersService } from './offers.service';

@Controller('offers')
@UseGuards(AuthGuard('jwt'))
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  getAllOffers(): Promise<Offer[]> {
    return this.offersService.getAll();
  }

  @Get(':id')
  getOfferById(@Param('id') id: string): Promise<Offer> {
    return this.offersService.getOfferById(+id);
  }

  @Post()
  createOffer(
    @Body() createOfferDto: CreateOfferDto,
    @GetUser() user,
  ): Promise<Offer> {
    return this.offersService.createOffer(createOfferDto, user);
  }
}
