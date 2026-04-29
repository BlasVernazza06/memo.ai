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

import { ChatsService } from '@modules/chats/services/chats.service';
import {
  AuthGuard,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';

import { AiService } from '@/modules/ai/services/ai.service';
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

    // 3. Obtener respuesta de la IA
    const aiResponse = await this.aiService.processDocument(file, content);

    // 4. Guardar respuesta de la IA
    const aiContent = `¡Procesado con éxito! 🧠\n\n**Resumen:** ${aiResponse.summary || 'Listo.'}\n\nHe generado material de estudio para ti.`;

    await this.chatsService.addMessage(chatId, 'ai', aiContent);

    return {
      role: 'ai',
      content: aiContent,
      data: aiResponse,
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
