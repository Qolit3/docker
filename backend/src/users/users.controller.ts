import { Controller, Get, Post, Body, Patch, Param, UseFilters, Req, UseGuards, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAlreadyExistsExceptionFilter } from 'src/exceptions-intreceptors/filters/user-already-exist-exception-filter';
import { InvalidLoginExceptionFilter } from 'src/exceptions-intreceptors/filters/invalid-login-exception-filter';
import { YandexGuard } from 'src/guards/yandex-guard';
import { JwtGuard } from 'src/guards/jwt-guard';
import { LocalGuard } from 'src/guards/local-guard';
import { ValidationErrorExceptionFilter } from 'src/exceptions-intreceptors/filters/validation-error-exception-filter';
import { UserAlreadyExistsException } from 'src/exceptions-intreceptors/exceptions/user-already-exist-exception';

@Controller('')
@UseFilters(UserAlreadyExistsExceptionFilter)
@UseFilters(InvalidLoginExceptionFilter)
@UseFilters(ValidationErrorExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    if(!(user instanceof HttpException)) {
      return this.usersService.auth(user);
    }
  }

  @Post('signin')
  signin(@Req() req) {
    return this.usersService.auth(req.user)
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Get('users/me')
  findMe(@Req() req) {
    return this.usersService.findOne(req.user.id);
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Patch('users/me') 
  patchMe(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto)
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Get('users/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Get('users/me/wishes')
  async findMyWishes(@Req() req) {
    const user = await this.usersService.findOne(req.user.id);

    return user.wishes
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Get('users/:id/wishes')
  async findWishes(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);

    return user.wishes
  }

  @UseGuards(JwtGuard, LocalGuard, YandexGuard)
  @Post('users/find')
  async findMany(@Body() query: string) {
    return this.usersService.findMany(query)
  }
  
  @UseGuards(YandexGuard)
  @Get('yandex/callback')
  yandexCallback(@Req() req) {
    return this.usersService.auth(req.user);
  } 
}
