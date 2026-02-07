import { Controller, All, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @All('*')
  async handleAuth(@Req() req: any) {
    const response = await this.authService.auth.handler(req);

    // 1. Extraer cookies de la respuesta de Better Auth
    const cookies = response.headers.get('set-cookie');

    // 2. Si existen cookies, pasarlas a la respuesta de NestJS
    if (cookies) {
      // response.headers es un objeto Headers de JS, no un string
      // Necesitamos parsearlo o usar el método setHeader de Express
      // La forma más fácil es convertirlo a string y setearlo en el objeto Response de Express
      
      // Nota: En NestJS, si devuelves un objeto Response, puedes setear headers directamente
      // Pero aquí 'response' es un objeto Response de la librería 'better-auth'
      // Necesitamos transferir esos headers a la respuesta de NestJS
      
      // La forma correcta en NestJS es usar el objeto Response nativo
      // Pero como estamos usando 'any', vamos a asumir que podemos manipular los headers
      
      // Mejor enfoque: Devolver el objeto Response de Better Auth directamente
      // y dejar que NestJS lo maneje, PERO NestJS necesita que los headers se pasen
      // de forma compatible.
      
      // Solución simple: Devolver un objeto que NestJS pueda entender
      return {
        body: response.body,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
      };
    }

    return response;
  }
}
