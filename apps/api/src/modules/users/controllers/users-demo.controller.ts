import { Controller, Post, Param, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersDemoService } from '../services/users-demo.service';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import * as fs from 'fs';
import * as path from 'path';

@Controller('users-demo')
export class UsersDemoController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersDemoService: UsersDemoService,
  ) {}

  @AllowAnonymous()
  @Post('seed/:userId')
  async seedDemo(@Param('userId') userId: string) {
    const logPath = path.join('c:', 'Users', 'USUARIO', 'Desktop', 'Programacion', 'Proyects', 'memo-ai', 'apps', 'api', 'seed-error.log');
    
    try {
      fs.writeFileSync(logPath, `[Controller] Petición recibida para userId: ${userId} a las ${new Date().toISOString()}\n`, { flag: 'a' });
      
      const user = await this.usersService.getUser(userId);
      fs.writeFileSync(logPath, `[Controller] Usuario encontrado: ${user.email}\n`, { flag: 'a' });
      
      if (!user.email.startsWith('guest-')) {
        throw new ForbiddenException('Solo se permite semillar cuentas de invitado/demo.');
      }
      
      await this.usersDemoService.seedDemoData(userId);
      
      fs.writeFileSync(logPath, `[Controller] ¡Semillado completado con éxito!\n`, { flag: 'a' });
      return { success: true };
    } catch (error: any) {
      const errMessage = `[Controller ERROR] Ocurrió un error al semillar para ${userId}: ${error.message}\nStack: ${error.stack}\n`;
      fs.writeFileSync(logPath, errMessage, { flag: 'a' });
      throw error;
    }
  }
}
