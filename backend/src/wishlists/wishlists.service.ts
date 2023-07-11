import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>
  ) {}
  create(createWishlistDto: CreateWishlistDto) {
    return this.wishlistRepository.create(createWishlistDto)
  }

  findAll() {
    return this.wishlistRepository.find()
  }

  findOne(id: number) {
    return this.wishlistRepository.findOneBy({
      id: id
    });
  }

  async update(id: number, updateWishlistDto: UpdateWishlistDto, user_id: number) {
    const wishlist = await this.wishlistRepository.findOneBy({
      id: id
    })

    if(wishlist && wishlist.owner.id === user_id) {
      return this.wishlistRepository.update(id, updateWishlistDto)
    }

    return null
  }

  async remove(id: number, user_id: number) {
    const wishlist = await this.wishlistRepository.findOneBy({
      id: id
    })

    if(wishlist && wishlist.owner.id === user_id) {
      return this.wishlistRepository.delete(id)
    }

    return null
  }
}
