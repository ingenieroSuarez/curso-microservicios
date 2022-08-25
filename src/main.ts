import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  const optionsSwagger= new DocumentBuilder()
  .setTitle('SuperFlight API')
  .setDescription('Scheduled flights app')
  .setVersion('1.0.0').setContact("juan fernando","", "correo.fernandosanchez@gmail.com")
  .build();

  const documentSwagger = SwaggerModule.createDocument(app, optionsSwagger)

  SwaggerModule.setup('/api/docs', app, documentSwagger,{
    swaggerOptions: {
      filter: true,
    }
  })


  await app.listen(process.env.PORT || 3000);
}
bootstrap();
