import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import {
  AuthGuard,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';

import { AiService } from '@/modules/ai/services/ai.service';

import { ChatsService } from './chats.service';
import { StorageService } from '@/modules/storage/services/storage.service';

@Controller('chats')
@UseGuards(AuthGuard)
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly aiService: AiService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  async createChat(
    @Session() session: UserSession,
    @Body('type') type?: 'creation' | 'study',
  ) {
    return this.chatsService.createChat(session.user.id, type);
  }

  @Post(':id/messages')
  @UseInterceptors(FileInterceptor('file'))
  async sendMessage(
    @Param('id') chatId: string,
    @Session() session: UserSession,
    @Body('content') content: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    // 1. Guardar mensaje del usuario
    await this.chatsService.addMessage(
      chatId,
      'user',
      content,
      file
        ? {
            name: file.originalname,
            type: file.mimetype,
            size: file.size,
          }
        : null,
    );

    // 2. Subir archivo si existe para tener metadatos persistentes
    let storageResult: any = null;
    if (file) {
      storageResult = await this.storageService.uploadWorkspaceDocument(file);
    }

    // 3. Obtener respuesta de la IA
    console.log('CHATS: Mandando a procesar documento. File presente:', !!file);
    const aiResponse = await this.aiService.processDocument(file, content);
    console.log('CHATS: Respuesta IA cruda (data):', JSON.stringify(aiResponse, null, 2));

    // 4. Guardar respuesta de la IA
    const aiContent = `¡Procesado con éxito! 🧠\n\n**Resumen:** ${aiResponse.summary || 'Listo.'}\n\nHe generado material de estudio para ti.`;

    await this.chatsService.addMessage(chatId, 'ai', aiContent);

    // 5. Enriquecer la respuesta con el contexto y metadatos del documento
    const enrichedData = {
      ...aiResponse,
      customContext: content || undefined,
      document: storageResult
        ? {
            name: storageResult.name,
            type: storageResult.type,
            url: storageResult.url,
            key: storageResult.key,
            sizeBytes: storageResult.sizeBytes,
            aiSummary: aiResponse.summary || undefined,
            thumbnailBase64: aiResponse.thumbnailBase64 || undefined,
          }
        : undefined,
    };

    console.log('CHATS: Data enriquecida final:', JSON.stringify(enrichedData, null, 2));

    return {
      role: 'ai',
      content: aiContent,
      data: enrichedData,
    };
  }

  @Get(':id')
  async getChatHistory(@Param('id') chatId: string) {
    return this.chatsService.getChatHistory(chatId);
  }

  @Get()
  async getUserChats(@Session() session: UserSession) {
    return this.chatsService.getUserChats(session.user.id);
  }
}
