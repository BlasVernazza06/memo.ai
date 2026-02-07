import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // Inyectamos nuestro AuthService para poder usar Better Auth
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Le pedimos a Better Auth que verifique si hay una sesión válida
    // en los headers de la petición actual
    const session = await this.authService.auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      // Si no hay sesión, lanzamos una excepción 401 (No autorizado)
      // NestJS capturará esto y le enviará el error correcto al cliente
      throw new UnauthorizedException('No estás logueado');
    }

    // Opcional: Guardamos el usuario en la petición para que el 
    // controlador pueda saber quién es el que está haciendo la consulta
    request.user = session.user;
    request.session = session.session;

    return true; // Si llegamos aquí, permitimos el acceso
  }
}