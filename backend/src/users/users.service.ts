import {
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'
import { User } from './user.entity'
import { UpdateUserDto } from './dto/updateUserDto'
import { CreateUserDto } from './dto/createUserDto'
import { Wish } from '../wishes/wish.entity'
import { FindUsersDto } from './dto/findUsersDto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getHashedPassword(password: string) {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
  }

  async createUser(createUserDto: CreateUserDto) {
    const { username, password, about, avatar, email  } = createUserDto
    const hashedPassword = await this.getHashedPassword(password)
    const newUser = this.usersRepository.create({
      username,
      password: hashedPassword,
      about,
      email,
      avatar,
    })
    await this.usersRepository.save(newUser)
    .catch(err => {
      if (err.code === '23505') {
        throw new ConflictException('Логин или почта заняты')
      } else {
        throw new InternalServerErrorException()
      }
    })

    return newUser
  }

  async getUserPrivateInfo(username: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ username })
    if (!user) {
      throw new NotFoundException(`${username} не существует`)
    } else {
      return user
    }
  }

  async getUserPublicInfo(username: string): Promise<Partial<User>> {
    const user = await this.getUserPrivateInfo(username)
    const { email, offers, password,  wishlists, wishes, ...rest  } = user

    return rest
  }

  getByUserId(id: number): Promise<User> {
    const user = this.usersRepository.findOne({
      where: { id },
      relations: ['wishlists', 'wishes', 'offers'],
    })
    if (!user) {
      throw new NotFoundException(`User with id ${id} does not exist`)
    } else {
      return user
    }
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const { password } = updateUserDto
    if (password) {
      const hashedPassword = await this.getHashedPassword(password)
      updateUserDto = { ...updateUserDto, password: hashedPassword }
    }

    return await this.usersRepository.update({ id }, updateUserDto)
      .then(() => {
        return this.getByUserId(id)  
      })
      .catch(err => {
        throw new BadRequestException(`${err.detail}`)  
      })
  }

  async getUserWishesById(id: number): Promise<Wish[]> {
    const user = await this.getByUserId(id)
    return user.wishes
  }

  async getUserWishesByUsername(username: string): Promise<Wish[]> {
    const user = await this.getUserPrivateInfo(username)
    return user.wishes
  }

  getUsersByUsernameAndEmail(findUsersDto: FindUsersDto): Promise<User[]> {
    const { query } = findUsersDto
    return this.usersRepository.find({
      where: [{ email: query }, { username: query }],
    })
  }
}
