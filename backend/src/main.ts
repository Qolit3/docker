import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: ['http://kassiopeya.kpd.nomoredomains.work', 'https://kassiopeya.kpd.nomoredomains.work'],
    methods: [ 'PATCH', 'POST', 'HEAD', 'PUT','DELETE', 'GET'],
    allowedHeaders: ['content-type', 'authorization'],
  };
  app.enableCors(corsOptions);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
    
  await app.listen(3000);
}


bootstrap();