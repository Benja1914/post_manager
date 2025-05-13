import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
  Logger,
} from '@nestjs/common';
import { HttpExceptionFilter } from './_common/exceptions/http.exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose', 'fatal'],
    });

    app.setGlobalPrefix('api');
    app.enableCors();
    app.use(cookieParser());

    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          const findFirstError = (errors: ValidationError[]) => {
            for (const error of errors) {
              if (error.constraints) return Object.values(error.constraints)[0];
            }
          };
          const firstError = findFirstError(errors);
          return new BadRequestException(firstError);
        },
      }),
    );

    const config = new DocumentBuilder()
      .setTitle('Turkana kafe API')
      .setDescription('API for Turkana kafe webApp')
      .setVersion('1.0.0')
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory, {
      customSiteTitle: 'Turkana kafe API Docs',
    });

    app.useGlobalFilters(new HttpExceptionFilter());

    logger.log('Conexión a la base de datos establecida correctamente.');

    await app.listen(process.env.PORT ?? 8080);
  } catch (error) {
    const logger = new Logger('Bootstrap');
    logger.error(
      'No se pudo conectar a la base de datos o iniciar la aplicación.',
      error,
    );
    process.exit(1);
  }
}
void bootstrap();
