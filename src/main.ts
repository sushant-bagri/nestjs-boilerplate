/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import * as compression from 'compression';
import { ValidationPipe } from '@nestjs/common';
import * as morgan from 'morgan';
import { HttpExceptionFilter } from './filters/bad-request.filter';
import { SharedModule } from './shared/shared.module';
import { AppConfigService } from './shared/services/app.config.service';
import { setupSwagger } from './swagger';
import { logger } from './config/logger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ trustProxy: true }));

  const reflector = app.get(Reflector);
  const appConfigService = app.select(SharedModule).get(AppConfigService);

  // @ts-ignore
  app.register(helmet);

  app.use(compression());
  app.use(morgan('combined'));

  app.useGlobalFilters(new HttpExceptionFilter(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      dismissDefaultMessages: false,
      validationError: {
        target: true,
        value: true,
      },
    }),
  );
  setupSwagger(app);
  const port = appConfigService.getNumber('PORT');
  await app.listen(port);

  logger.info(`Server is running on PORT:${port}`);
}

bootstrap().then();
