import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ThrottlerGuard } from '@nestjs/throttler';

import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { z } from 'zod';

import { type DbWorkspace } from '@repo/db';
import { CreateWorkspaceSchema } from '@repo/validators';

import { User } from '@/common/decorators/user.decorator';
import { StorageService } from '@/modules/storage/services/storage.service';
import { UpdateWorkspaceDto } from '@/modules/workspaces/dto/workspace-update.dto';
import { WorkspacesService } from '@/modules/workspaces/services/workspaces.service';

@Controller('workspaces')
@UseGuards(AuthGuard, ThrottlerGuard)
export class WorkspacesController {
  constructor(
    private readonly workspacesService: WorkspacesService,
    private readonly storageService: StorageService,
  ) {}

  @Get()
  async findAll(@User('id') userId: string): Promise<DbWorkspace[]> {
    return await this.workspacesService.findAll(userId);
  }

  @Get('summary')
  async getSummary(@User('id') userId: string) {
    return await this.workspacesService.getSummary(userId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @User('id') userId: string,
    @Body() body: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    // 1. Deserializar metadatos de forma segura
    let metadata = body;

    // Si viene como multipart/form-data, el campo 'metadata' suele ser un string JSON
    if (typeof body.metadata === 'string') {
      try {
        metadata = JSON.parse(body.metadata);
      } catch (error) {
        throw new Error('El campo metadata no es un JSON válido');
      }
    }

    if (!metadata || Object.keys(metadata).length === 0) {
      throw new Error('No se proporcionaron metadatos para crear el workspace');
    }

    const parsedMetadata = metadata as any;
    console.log('[WorkspacesController] Body raw recibido:', JSON.stringify(body, null, 2));

    // Fallback de nombre si la IA no lo generó o el usuario no lo mandó
    if (!parsedMetadata.name) {
      parsedMetadata.name = file
        ? `Workspace: ${file.originalname.split('.')[0]}`
        : `Nuevo Workspace ${new Date().toLocaleDateString()}`;
    }

    // 2. Si hay archivo binario, subirlo y agregarlo a la lista de documentos
    if (file) {
      const storageResult = await this.storageService.uploadWorkspaceDocument(file);
      
      const newDoc = {
        name: storageResult.name,
        type: 'pdf',
        url: storageResult.url,
        key: storageResult.key,
        sizeBytes: storageResult.sizeBytes,
        aiSummary: (parsedMetadata.document?.aiSummary || parsedMetadata.documents?.[0]?.aiSummary) ?? undefined,
        thumbnailBase64: (parsedMetadata.document?.thumbnailBase64 || parsedMetadata.documents?.[0]?.thumbnailBase64) ?? undefined,
      };

      // Inyectamos en documents (plural) como fuente única de verdad
      parsedMetadata.documents = [newDoc];
      delete parsedMetadata.document;
    } else {
      // Normalización para creación desde Chat (donde no hay 'file' binario porque ya se subió)
      const singularDoc = parsedMetadata.document;
      const pluralDocs = parsedMetadata.documents;

      if (singularDoc && (!pluralDocs || pluralDocs.length === 0)) {
        console.log('[WorkspacesController] Normalizando: moviendo singular document a plural documents');
        parsedMetadata.documents = [singularDoc];
      }
    }

    // SANITIZACIÓN: Asegurar que aiSummary sea un string (la IA a veces devuelve un array)
    const sanitizeDoc = (doc: any) => {
      if (doc && Array.isArray(doc.aiSummary)) {
        console.log('[WorkspacesController] Sanitizando aiSummary de array a string');
        doc.aiSummary = doc.aiSummary.join('\n\n');
      }
    };

    if (parsedMetadata.document) sanitizeDoc(parsedMetadata.document);
    if (Array.isArray(parsedMetadata.documents)) {
      parsedMetadata.documents.forEach(sanitizeDoc);
    }

    // 3. Validar metadatos
    const validatedData = CreateWorkspaceSchema.parse(parsedMetadata);

    console.log('[WorkspacesController] Data validada para crear workspace:', {
      name: validatedData.name,
      hasDocument: !!validatedData.document,
      documentsCount: validatedData.documents?.length || 0,
    });

    return await this.workspacesService.create(userId, validatedData);
  }

  @Get(':id')
  async findById(
    @User('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.workspacesService.findById(userId, id);
  }

  @Patch(':id')
  async update(
    @User('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateWorkspaceDto,
  ) {
    return await this.workspacesService.update(userId, id, data);
  }

  @Delete(':id')
  async delete(
    @User('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.workspacesService.delete(userId, id);
  }

  @Post(':id/like')
  async like(
    @User('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.workspacesService.like(userId, id);
  }
}
