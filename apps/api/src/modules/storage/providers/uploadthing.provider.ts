/// <reference types="multer" />
import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import {
  IStorageProvider,
  StorageResult,
} from '@modules/storage/interfaces/storage-provider.interface';
import { UTApi } from 'uploadthing/server';

@Injectable()
export class UploadthingProvider implements IStorageProvider {
  private readonly utapi: UTApi;

  constructor(@Inject('UPLOADTHING_TOKEN') private readonly token: string) {
    this.utapi = new UTApi({ token: this.token });
  }

  async uploadFile(file: Express.Multer.File): Promise<StorageResult> {
    try {
      const fileToUpload = new File(
        [new Uint8Array(file.buffer)],
        file.originalname,
        {
          type: file.mimetype,
        },
      );

      const responses = await this.utapi.uploadFiles([fileToUpload]);
      const response = responses[0];

      if (!response || response.error) {
        throw new Error(
          response?.error?.message ?? 'Error desconocido al subir el archivo',
        );
      }

      return {
        key: response.data.key,
        url: response.data.url,
        name: response.data.name,
        type: file.mimetype, // Usamos el mimetype original del archivo Multer
        sizeBytes: response.data.size,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al subir a UploadThing: ${error}`,
      );
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      await this.utapi.deleteFiles(key);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al eliminar de UploadThing: ${error}`,
      );
    }
  }
}
