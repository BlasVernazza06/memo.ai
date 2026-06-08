import { NestFactory } from '@nestjs/core';

import 'dotenv/config';
import { json, urlencoded } from 'express';

import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';

async function bootstrap() {
  console.log('--- Starting API Bootstrap ---');
  // Deshabilitamos el bodyParser por defecto para configurarlo manualmente con límites más altos
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    rawBody: true,
  });

  // Habilitar trust proxy para que NestJS/Express lea correctamente X-Forwarded-Proto y X-Forwarded-Host
  // Esto es obligatorio al estar detrás de los proxies de Render y Vercel
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', true);

  // Aumentar el límite para JSON y URL encoded (necesario para workspaces grandes)
  // Excluimos las rutas de Better Auth (/api/auth) para que no interfieran con el stream crudo
  app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api/auth')) {
      next();
    } else {
      json({ limit: '10mb' })(req, res, next);
    }
  });
  app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api/auth')) {
      next();
    } else {
      urlencoded({ extended: true, limit: '10mb' })(req, res, next);
    }
  });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Habilitar CORS para que el Frontend pueda comunicarse con el Backend
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      const allowedPatterns = [
        /^http:\/\/localhost:\d+$/,
        /\.vercel\.app$/,
      ];
      const isAllowed =
        allowedPatterns.some((pattern) => pattern.test(origin)) ||
        origin === process.env.NEXT_PUBLIC_APP_URL;

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    exposedHeaders: ['Location', 'location', 'set-cookie'],
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
