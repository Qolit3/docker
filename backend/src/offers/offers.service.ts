import {
  ForbiddenException,
  BadRequestException,
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Offer } from './offer.entity'
import { CreateOfferDto } from './dto/createOfferDto'
import { User } from '../users/user.entity'
import { WishesService } from '../wishes/wishes.service'

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    @Inject(WishesService)
    private readonly wishesService: WishesService,
    private dataSource: DataSource,
  ) {}

  getAll(): Promise<Offer[]> {
    return this.offersRepository.find({
      where: {},
      relations: ['item', 'user'],
    })
  }

  async getOfferById(id: number): Promise<Offer> {
    const offer = await this.offersRepository.findOne({
      where: { id },
      relations: ['user', 'item'],
    })
    if (!offer) {
      throw new NotFoundException(`Донат с таким id ${id} не существует`)
    }

    return offer
  }

  async createOffer(
    createOfferDto: CreateOfferDto,
    user: User,
  ): Promise<Offer> {
    const { itemId, amount, hidden } = createOfferDto
    const wish = await this.wishesService.getWishById(itemId)
    
    if (this.wishesService.checkWishOwner(wish, user)) {
      throw new ForbiddenException('Вы не можете делать донаты на свои подарки')
    } else if (wish.raised + amount > wish.price) {
      throw new BadRequestException(`Вы можете задонатить до ${wish.price - wish.raised}`)
    }
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
    const newOffer = this.offersRepository.create({
      hidden,
      amount,
      item: wish,
      user,
    })

    return await this.offersRepository.save(newOffer)
      .then(() => {
        this.wishesService.updateRaisedWish(wish, amount)
        return newOffer
      })
      .catch(err => {
        queryRunner.rollbackTransaction()
        throw new InternalServerErrorException(err.code)
      })
      .finally(() => {
        queryRunner.release()
      })
  }
}
