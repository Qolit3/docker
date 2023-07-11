import { HttpException, HttpStatus } from '@nestjs/common';

export class OfferMoreThanWishPriceException extends HttpException {
  constructor() {
    super('Сумма взноса превышает сумму остатка стоимости подарка', HttpStatus.CONFLICT);
  }
} 