import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_TITLE, PORT } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());

  app.disable('x-powered-by');

  const options = new DocumentBuilder()
    .setTitle(APP_TITLE)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document, {
    customSiteTitle: APP_TITLE,
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      persistAuthorization: true,
    },
  });
  const server = await app.listen(PORT);
  server.setTimeout(60 * 60 * 1000);
}
bootstrap();
