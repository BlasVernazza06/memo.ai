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

import { AiService } from '@/modules/ai/ai.service';

import { ChatsService } from './chats.service';

@Controller('chats')
@UseGuards(AuthGuard)
export class ChatsController {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly aiService: AiService,
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
    @UploadedFile() file?: any,
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

    // 2. Obtener respuesta de la IA
    // Por ahora usamos el processDocument existente, pero lo adaptaremos
    const aiResponse = await this.aiService.processDocument(file, content);

    // 3. Guardar mensaje de la IA
    // Formateamos la respuesta de la IA para el chat
    const aiContent = `¡Procesado con éxito! 🧠\n\n**Resumen:** ${aiResponse.summary}\n\nHe generado ${aiResponse.flashcards.length} flashcards y ${aiResponse.quizzes.length} preguntas de quiz para ti.`;

    await this.chatsService.addMessage(chatId, 'ai', aiContent);

    return {
      role: 'ai',
      content: aiContent,
      data: aiResponse, // Enviamos la data cruda también por si el front la necesita
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
