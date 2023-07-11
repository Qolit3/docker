import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { Wish } from 'src/wishes/entities/wish.entity';
import { OfferMoreThanWishPriceException } from 'src/exceptions-intreceptors/exceptions/offer-more-than-wish-price-exception';
import { OfferOnOwnWishException } from 'src/exceptions-intreceptors/exceptions/offer-on-own-wish-exception';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>
  ) {}

  async create(createOfferDto: CreateOfferDto, user_id: number) {
    const wish = await this.wishesRepository.findOneBy({
      id: createOfferDto.itemId
    })

    if(wish && wish.price <= wish.raised){
      return new OfferMoreThanWishPriceException()
    }

    if(wish && wish.owner.id !== user_id) {
      return this.offerRepository.create(createOfferDto)
    }

    return new OfferOnOwnWishException()
  }

  findAll() {
    return this.offerRepository.find();
  }

  findOne(id: number) {
    return this.offerRepository.findOneBy({
      id: id
    });
  }
}
