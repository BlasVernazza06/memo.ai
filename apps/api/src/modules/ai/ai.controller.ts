import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('process')
  @UseInterceptors(FileInterceptor('file'))
  async processDocument(
    @UploadedFile() file: any,
    @Body('userContext') userContext: string,
  ) {
    console.log('--- BACKEND REQUEST RECEIVED ---');
    console.log('Context:', userContext);
    console.log('File:', file ? file.originalname : 'No file');

    return this.aiService.processDocument(file, userContext);
  }
}
