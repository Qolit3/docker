import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';

import { InvalidLoginException } from '../exceptions/invalid-login-exception';


@Catch(InvalidLoginException)
export class InvalidLoginExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidLoginException, host: ArgumentsHost) {
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