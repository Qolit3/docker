import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidLoginException extends HttpException {
  constructor() {
    super('Некорректная пара логин и пароль', HttpStatus.UNAUTHORIZED);
  }
} 