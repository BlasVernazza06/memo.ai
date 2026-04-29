/// <reference types="multer" />
export interface StorageResult {
  key: string;
  url: string;
  name: string;
  type: string;
  sizeBytes: number;
}

export interface PresignedUrlResult {
  uploadUrl: string; // La URL temporal de AWS para subir
  key: string; // El nombre único del archivo
  url: string; // La URL final donde se verá el archivo
}

export abstract class IStorageProvider {
  abstract uploadFile(file: Express.Multer.File): Promise<StorageResult>;
  abstract deleteFile(key: string): Promise<void>;
  abstract getPresignedUrl(
    fileName: string,
    contentType: string,
  ): Promise<PresignedUrlResult>;
}
