import { Controller, Get, UseGuards } from '@nestjs/common';

import {
  AuthGuard,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  @Get('session')
  getSession(@Session() session: UserSession) {
    return session;
  }
}
