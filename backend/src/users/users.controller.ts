import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common'
import { UsersService } from './users.service'

import { AuthGuard } from '@nestjs/passport'
import { User } from './user.entity'
import { UpdateUserDto } from './dto/updateUserDto'
import { GetUser } from '../decorators/getUser.decorator'
import { FindUsersDto } from './dto/findUsersDto'
import { Wish } from '../wishes/wish.entity'

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getUser(@GetUser() user: User): Promise<User> {
    return this.usersService.getByUserId(user.id)
  }

  @Patch('me')
  updateUser(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(user.id, updateUserDto)
  }

  @Get('/me/wishes')
  getUserWishes(@GetUser() user: User): Promise<Wish[]> {
    return this.usersService.getUserWishesById(user.id)
  }

  @Get(':username')
  getUserByName(
    @Param('username') username: string,
  ): Promise<Partial<User>> {
    return this.usersService.getUserPrivateInfo(username)
  }

  @Get(':username/wishes')
  getUserWishesByUsername(
    @Param('username') username: string,
  ): Promise<Wish[]> {
    return this.usersService.getUserWishesByUsername(username)
  }

  @Post('find')
  getUsersByUsernameOrEmail(
    @Body() findUsersDto: FindUsersDto,
  ): Promise<User[]> {
    return this.usersService.getUsersByUsernameAndEmail(findUsersDto)
  }
}
