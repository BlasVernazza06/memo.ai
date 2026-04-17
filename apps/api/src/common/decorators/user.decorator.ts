import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import type { UserSession } from '@thallesp/nestjs-better-auth';

/**
 * Decorador para extraer el usuario de la sesión de Better Auth.
 * Uso:
 * - @User() user: UserSession['user']
 * - @User('id') userId: string
 */
export const User = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ session: UserSession }>();

    // Better Auth (thallesp version) suele inyectar la sesión en request.session
    // o podemos extraerla de lo que el Guard ya procesó.
    // Como no tenemos acceso directo a la implementación interna de @Session(),
    // usaremos la misma lógica que Nest para buscarlo en el request.
    const session = request.session;

    if (!session || !session.user) {
      return null;
    }

    if (data && data in session.user) {
      return session.user[data as keyof typeof session.user];
    }

    return session.user;
  },
);
