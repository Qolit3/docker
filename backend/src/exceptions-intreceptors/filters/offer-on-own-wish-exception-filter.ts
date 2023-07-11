import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { OfferOnOwnWishException } from '../exceptions/offer-on-own-wish-exception';


@Catch(OfferOnOwnWishException)
export class OfferOnOwnWishExceptionFilter implements ExceptionFilter {
  catch(exception: OfferOnOwnWishException, host: ArgumentsHost) {
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