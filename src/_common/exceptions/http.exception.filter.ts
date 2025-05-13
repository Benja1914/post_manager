import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseResponse } from 'src/_base/response/base.response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let responseMessage: string;

    switch (status) {
      case 404:
        responseMessage = 'Recurso no encontrado.';
        break;
      case 403:
        responseMessage = 'Acceso prohibido.';
        break;
      case 400:
        responseMessage = 'Solicitud incorrecta.';
        break;
      case 401:
        responseMessage = 'No autorizado.';
        break;
      case 422:
        responseMessage = 'Error de validación.';
        break;
      case 429:
        responseMessage = 'Demasiadas solicitudes.';
        break;
      case 409:
        responseMessage = 'Conflicto.';
        break;
      case 500:
        responseMessage = 'Error interno del servidor.';
        break;
      case 502:
        responseMessage = 'Bad Gateway.';
        break;
      case 503:
        responseMessage = 'Servicio no disponible.';
        break;
      case 504:
        responseMessage = 'Tiempo de espera de la puerta de enlace agotado.';
        break;
      default:
        responseMessage = 'Error inesperado: ' + exception.message;
        break;
    }

    response
      .status(status)
      .json(new BaseResponse(null, responseMessage, false));
  }
}
