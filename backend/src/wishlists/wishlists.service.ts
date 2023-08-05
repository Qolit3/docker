import {
  ForbiddenException,
  BadRequestException,
  NotFoundException,
  Injectable
} from '@nestjs/common'

import { Wishlist } from './wishlist.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../users/user.entity'
import { Repository } from 'typeorm'
import { Wish } from '../wishes/wish.entity'
import { CreateWishlistDto } from './dto/createWishlistDto'
import { UpdateWishlistDto } from './dto/updateWishlistDto'

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  getAlWishlists(): Promise<Wishlist[]> {
    return this.wishlistRepository.find({})
  }

  async getWishlistById(id: number): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    })

    if (!wishlist) {
      throw new NotFoundException(`Вишлист с таким ${id} не найден`)
    }

    return wishlist
  }

  async removeWishlist(user: User, id: number): Promise<{ message: string }> {
    const wishlist = await this.getWishlistById(id)
    if (wishlist.owner.id !== user.id) {
      throw new ForbiddenException('Вы можете удалять только свои подарки')
    } else {
      return this.wishlistRepository.delete(id)
        .then(() => {
          return  { message: `Подарок с ${id} успешно удалён` }
        })
        .catch((err) => {
          throw new BadRequestException(`${err}`)
        })
    }
  }

  async createWishlist(createWishlistDto: CreateWishlistDto, user: User): Promise<Wishlist> {
    const { image, itemsId, name, description = '' } = createWishlistDto
    const items = itemsId.map((id) => ({ id } as Wish))
    
    const wishList = this.wishlistRepository.create({
      name,
      image,
      description,
      owner: user,
      items,
    })

    return await this.wishlistRepository.save(wishList)
      .catch(err => {
        throw new BadRequestException(`${err}`)
      })
  }

  async updateWishlist(user: User, id: number, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist> {
    const wishlist = await this.getWishlistById(id)
    if (wishlist.owner.id !== user.id) {
      throw new ForbiddenException('Вы можете обновить только свой Вишлист')
    } else {
      const { itemsId, ...rest } = updateWishlistDto
      const items = itemsId.map((id) => ({ id } as Wishlist))

      return await this.wishlistRepository.save({ id, ...rest, items })
        .then(() => {
          return this.getWishlistById(wishlist.id)
        })
        .catch(err => {
          throw new BadRequestException(`${err}`)
        })
    }
  }
}
