import { Injectable } from '@nestjs/common';

import { IStorageProvider } from '../interfaces/storage-provider.interface';

@Injectable()
export class StorageService {
  constructor(private readonly storageProvider: IStorageProvider) {}

  async uploadWorkspaceDocument(file: Express.Multer.File) {
    return this.storageProvider.uploadFile(file);
  }

  async uploadWorkspaceCover(file: Express.Multer.File, oldKey?: string) {
    if (oldKey) {
      await this.storageProvider.deleteFile(oldKey);
    }

    return this.storageProvider.uploadFile(file);
  }

  async getPresignedUrl(fileName: string, contentType: string) {
    return this.storageProvider.getPresignedUrl(fileName, contentType);
  }

  async deleteFile(key: string) {
    return this.storageProvider.deleteFile(key);
  }
}
