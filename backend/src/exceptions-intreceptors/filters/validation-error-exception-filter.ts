import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';


import { ValidationErrorException } from '../exceptions/validation-error-exception';


@Catch(ValidationErrorException)
export class ValidationErrorExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationErrorException, host: ArgumentsHost) {
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