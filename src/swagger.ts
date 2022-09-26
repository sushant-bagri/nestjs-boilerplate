import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * setupSwagger
 * @export
 * @param {INestApplication} app
 */
export function setupSwagger(app: INestApplication) {
  const localhostPort: number = Number(process.env.PORT);
  const localhostUrl = localhostPort ? `http://localhost:${localhostPort}` : 'http://localhost:3000';
  const options = new DocumentBuilder()
    .setTitle('Nest Boiler-plate with MongoDB')
    .setDescription('This swagger documentation includes the Nest Boiler-plate with MongoDB')
    .addTag('Nest Boiler-plate with MongoDB')
    .setVersion('1.0.0')
    .addServer(localhostUrl)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
