/// <reference types="multer" />
export interface StorageResult {
  key: string;
  url: string;
  name: string;
  type: string;
  sizeBytes: number;
}

export abstract class IStorageProvider {
  abstract uploadFile(file: Express.Multer.File): Promise<StorageResult>;
  abstract deleteFile(key: string): Promise<void>;
}
