import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { IStorageProvider } from './interfaces/storage-provider.interface';
import { UploadthingProvider } from './providers/uploadthing.provider';
import { StorageService } from './services/storage.service';

@Module({
  imports: [ConfigModule],
  providers: [
    StorageService,
    {
      provide: 'UPLOADTHING_TOKEN',
      useFactory: (configService: ConfigService) => {
        return configService.get<string>('UPLOADTHING_SECRET');
      },
      inject: [ConfigService],
    },
    {
      provide: IStorageProvider,
      useClass: UploadthingProvider,
    },
  ],
  exports: [StorageService],
})
export class StorageModule {}
