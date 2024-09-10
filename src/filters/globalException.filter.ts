import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

        let message = 'Internal server error';  // Mensaje por defecto
        if (exception instanceof HttpException) {
          const response = exception.getResponse();
          if (typeof response === 'string') {
            message = response;  // Mensaje directo
          } else if (typeof response === 'object' && response.hasOwnProperty('message')) {
            message = (response as any).message;  // Extraer mensaje de un objeto
          }
        }

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message,
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
