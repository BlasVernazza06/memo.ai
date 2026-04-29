import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { IStorageProvider } from './interfaces/storage-provider.interface';
import { S3Provider } from './providers/s3.provider';
import { StorageService } from './services/storage.service';
import { StorageController } from './controllers/storage.controller';

@Module({
  imports: [ConfigModule],
  controllers: [StorageController],
  providers: [
    StorageService,
    {
      provide: IStorageProvider,
      useClass: S3Provider,
    },
  ],
  exports: [StorageService],
})
export class StorageModule {}
