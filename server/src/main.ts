import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { APP_TITLE, PORT } from './config';

async function bootstrap() {
  console.log('process.env.POSTGRES_USERNAME: ', process.env.POSTGRES_USERNAME);
  const app = await NestFactory.create(AppModule);
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
    },
  });
  await app.listen(PORT);
}
bootstrap();