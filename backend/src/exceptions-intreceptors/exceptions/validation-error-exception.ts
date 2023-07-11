import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationErrorException extends HttpException {
  constructor() {
    super('Ошибка валидации переданных значений', HttpStatus.BAD_REQUEST);
  }
} 