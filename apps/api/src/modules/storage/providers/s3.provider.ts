import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  IStorageProvider,
  PresignedUrlResult,
  StorageResult,
} from '@modules/storage/interfaces/storage-provider.interface';

@Injectable()
export class S3Provider implements IStorageProvider {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_REGION') || 'us-east-1';
    this.bucketName = this.configService.getOrThrow<string>('AWS_BUCKET_NAME');

    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>(
          'AWS_SECRET_ACCESS_KEY',
        ),
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<StorageResult> {
    try {
      const uniqueId = crypto.randomUUID();
      const sanitizedName = file.originalname.replace(/\s+/g, '-');
      const key = `${uniqueId}-${sanitizedName}`;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);

      const regionPrefix =
        this.region === 'us-east-1' ? 's3' : `s3.${this.region}`;
      const url = `https://${this.bucketName}.${regionPrefix}.amazonaws.com/${key}`;

      return {
        key: key,
        url: url,
        name: file.originalname,
        type: file.mimetype,
        sizeBytes: file.size,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al subir a AWS S3: ${error.message}`,
      );
    }
  }

  async getPresignedUrl(
    fileName: string,
    contentType: string,
  ): Promise<PresignedUrlResult> {
    try {
      const uniqueId = crypto.randomUUID();
      const sanitizedName = fileName.replace(/\s+/g, '-');
      const key = `${uniqueId}-${sanitizedName}`;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        ContentType: contentType,
      });

      // La URL expira en 60 segundos (tiempo suficiente para iniciar la subida)
      const uploadUrl = await getSignedUrl(this.s3Client, command, {
        expiresIn: 60,
      });

      const regionPrefix =
        this.region === 'us-east-1' ? 's3' : `s3.${this.region}`;
      const url = `https://${this.bucketName}.${regionPrefix}.amazonaws.com/${key}`;

      return {
        uploadUrl,
        key,
        url,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al generar Presigned URL: ${error.message}`,
      );
    }
  }

  async deleteFile(key: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      await this.s3Client.send(command);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al eliminar de AWS S3: ${error.message}`,
      );
    }
  }
}
