import { Controller, Delete, Get, UseGuards } from '@nestjs/common';

import {
  AuthGuard,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';

import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('session')
  getSession(@Session() session: UserSession) {
    return session;
  }

  @Get('me')
  async getMe(@Session() session: UserSession) {
    return this.usersService.getUser(session.user.id);
  }

  @Delete('')
  async delete(@Session() session: UserSession) {
    return this.usersService.deleteUser(session.user.id);
  }
}
