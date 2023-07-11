import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { OfferMoreThanWishPriceException } from '../exceptions/offer-more-than-wish-price-exception';


@Catch(OfferMoreThanWishPriceException)
export class OfferMoreThanWishPriceExceptionFilter implements ExceptionFilter {
  catch(exception: OfferMoreThanWishPriceException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const message = exception.getResponse();

    const ctx = host.switchToHttp();

    const request = ctx.getRequest();
    const response = ctx.getResponse();

    response
      .status(status)
      .json({
        error: {
          status: status,
          message: message,
          method: request.method,
          url: request.url,
        }
      });   
  }
}