import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { UsersController } from '@modules/users/controllers/users.controller';
import { UsersRepository } from '@modules/users/repositories/users.repository';
import { UsersService } from '@modules/users/services/users.service';
import { StorageModule } from '@/modules/storage/storage.module';

@Module({
  imports: [
    CacheModule.register(), // 2. Registramos la capacidad de caché en este módulo
    StorageModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}


