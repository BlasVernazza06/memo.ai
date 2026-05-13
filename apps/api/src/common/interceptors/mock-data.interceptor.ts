import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { of } from 'rxjs';

@Injectable()
export class MockDataInterceptor implements NestInterceptor {
  private readonly useMock = process.env.USE_MOCK_DATA === 'true';

  intercept(context: ExecutionContext, next: CallHandler) {
    if (!this.useMock) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    // Solo mockeamos las peticiones GET para diseño
    if (method !== 'GET') {
      return next.handle();
    }

    console.log(`🏗️  [GLOBAL MOCK] Intercepting GET ${url}`);

    // Definición de datos falsos según la ruta
    if (url.includes('/workspaces')) {
      return of([
        { id: '1', name: 'Proyectos Personales', color: '#3b82f6', icon: '🚀' },
        { id: '2', name: 'Universidad', color: '#8b5cf6', icon: '📚' },
        { id: '3', name: 'Trabajo', color: '#10b981', icon: '💼' },
      ]);
    }

    if (url.includes('/flashcards')) {
      return of([
        { id: 'f1', name: 'Anatomía II', cardsCount: 45, workspaceId: '2' },
        { id: 'f2', name: 'React Hooks', cardsCount: 12, workspaceId: '1' },
      ]);
    }

    if (url.includes('/quizzes')) {
      return of([
        { id: 'q1', name: 'Examen de Redes', totalQuestions: 20, workspaceId: '2' },
      ]);
    }

    // Si no tenemos un mock específico, dejamos que siga (o devolvemos algo genérico)
    return next.handle();
  }
}
