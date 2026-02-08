import * as dotenv from 'dotenv';
import { join } from 'path';

// Buscar el .env de forma robusta
dotenv.config({ path: join(process.cwd(), '../../.env') });
dotenv.config({ path: join(process.cwd(), '.env') }); // Por si acaso CWD es la raíz

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    console.log('Bootstrapping NestJS...');
    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });

    console.log('Starting NestJS on port 4000...');
    await app.listen(process.env.PORT ?? 4000);
    console.log('NestJS is running on http://localhost:4000');
  } catch (error) {
    console.error('Error during NestJS bootstrap:', error);
  }
}
bootstrap();
