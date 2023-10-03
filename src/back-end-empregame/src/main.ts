import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('EmpregaMe')
    .setDescription('Projeto 4° Semestre - ADS')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-doc', app, document);

  await app.listen(3000),
    () => {
      const logger = new Logger('Server');

      logger.log('Is running: 3000');
    };
}
bootstrap();
