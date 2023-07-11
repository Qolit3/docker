import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super('Пользователь с таким email или username уже ззарегистрирован', HttpStatus.CONFLICT);
  }
} 