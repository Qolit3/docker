import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './entities/wish.entity';
import { FindOptions, Repository } from 'typeorm';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>
  ) {}
  create(createWishDto: CreateWishDto) {
    return this.wishRepository.create(createWishDto)
  }

  findAll() {
    return this.wishRepository.find();
  }

  findMany(options) {
    return this.wishRepository.find(options)
  }

  findOne(id: number) {
    return this.wishRepository.findOneBy({
      id: id
    });
  }

  async update(id: number, updateWishDto: UpdateWishDto, user_id: number) {
    const wish = await this.wishRepository.findOneBy({
      id: id
    })

    if (updateWishDto.price && wish.raised > 0) {
      throw new ForbiddenException(
        'Вы не можете изменять стоимость подарка, если уже есть желающие скинуться',
      );
    }

    if(wish && wish.owner.id === user_id) {
      return this.wishRepository.update(id, updateWishDto)
    }
    
    return new NotFoundException('Подарок не найден')
  }

  async remove(id: number, user_id: number) {
    const wish = await this.wishRepository.findOneBy({
      id: id
    })

    if(wish && wish.owner.id === user_id) {
      return this.wishRepository.delete(id)
    }
    return null;
  }

  async copy(id: number, user_id: number) {
    const wish = await this.wishRepository.findOneBy({
      id: id
    })

    const duplicateWish = await this.wishRepository.findOne({
      where: {
        name: wish.name,
        link: wish.link,
        price: wish.price,
        owner: { id: user_id },
      },
      relations: { owner: true },
    });

    if (duplicateWish) {
      throw new ForbiddenException('Вы уже добавили к себе этот подарок');
    }

    return this.create(wish)
  }
}
