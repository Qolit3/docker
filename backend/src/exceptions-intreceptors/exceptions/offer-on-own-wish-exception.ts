import { HttpException, HttpStatus } from '@nestjs/common';

export class OfferOnOwnWishException extends HttpException {
  constructor() {
    super('Вы не можете вносить деньги на собственные подарки', HttpStatus.CONFLICT);
  }
} 