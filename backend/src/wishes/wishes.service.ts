import {
  ForbiddenException,
  BadRequestException,
  NotFoundException,
  Injectable
} from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateWishDto } from './dto/createWishDto'
import { Wish } from './wish.entity'
import { UpdateWishDto } from './dto/updateWishDto'
import { User } from '../users/user.entity'

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishesRepository: Repository<Wish>,
  ) {}

  async getAlWishes(): Promise<Wish[]> {
    return this.wishesRepository.find()
  }

  async createWish(createWishDto: CreateWishDto, user: User): Promise<Wish> {
    const { price, description, image, name, link} = createWishDto
    const wish = this.wishesRepository.create({
      image,
      name,
      price,
      link,
      owner: user,
      description,
    })
    await this.wishesRepository.save(wish)
    
    return wish
  }

  getLastWishes(): Promise<Wish[]> {
    return this.wishesRepository.find({
      where: {},
      order: { createdAt: 'DESC' },
      take: 40,
    })
  }

  getTopWishes(): Promise<Wish[]> {
    return this.wishesRepository.find({
      where: {},
      order: { copied: 'DESC' },
      take: 20,
    })
  }
  async getWishById(wishId: number): Promise<Wish> {
    const wish = await this.wishesRepository.findOne({
      where: { id: wishId },
      relations: ['offers', 'owner'],
    })
    
    if (!wish) {
      throw new NotFoundException(`Подарок с таким id: ${wishId} не существует`)
    }

    return wish
  }

  checkWishOwner(wish: Wish, user: User): boolean {
    return wish.owner.id === user.id
  }

  updateRaisedWish(wish: Wish, amount: number) {
    return this.wishesRepository.update(
      { id: wish.id },
      { raised: wish.raised + amount },
    )
  }

  async updateWish(wishId: number, user: User, updateWishDto: UpdateWishDto): Promise<Wish> {
    const wish = await this.getWishById(wishId)
    if (!this.checkWishOwner(wish, user)) {
      throw new ForbiddenException('Вы можете обновлять только свои подарки')
    } else if (wish.raised > 0) {
      throw new BadRequestException('Вы не можете обнволять подарки, на которые есть донаты')
    } else {
      return await this.wishesRepository.update({ id: wishId }, updateWishDto)
        .then(() => {
          return this.getWishById(wishId)
        })
        .catch(err => {
          throw new BadRequestException(`${err}`)
        })
    }
  }

  async copyWish(wishId: number, user: User): Promise<Wish> {
    const wish = await this.getWishById(wishId)
    if (this.checkWishOwner(wish, user)) {
      throw new BadRequestException('Вы не можете копировать свои подарки')
    }
    const newWish = await this.createWish({ ...wish }, user)
    this.wishesRepository.update({ id: wishId }, { copied: wish.copied + 1 })

    return newWish
  }

  async removeWish(wishId: number, user: User): Promise<{ message: string }> {
    const wish = await this.getWishById(wishId)
    if (!this.checkWishOwner(wish, user)) {
      throw new ForbiddenException('Вы можете удалять только свои подарки')
    } else {
      return await this.wishesRepository.delete(wishId)
        .then(() => {
          return { message: `Подарок с таким id ${wishId} успешно удалён` }
        }) 
        .catch(err => {
          throw new BadRequestException(`${err}`)
        })
    }
  }
}
