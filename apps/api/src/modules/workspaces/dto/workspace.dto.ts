import { createZodDto } from 'nestjs-zod';

import {
  CreateWorkspaceSchema,
  FlashcardSchema,
  FlashcardUpdateSchema,
  FlashcardsUpdateSchema,
  UpdateWorkspaceSchema,
  WorkspaceCardSchema,
  WorkspaceDetailSchema,
} from '@repo/validators';

export class CreateWorkspaceDTO extends createZodDto(CreateWorkspaceSchema) {}
export class UpdateWorkspaceDTO extends createZodDto(UpdateWorkspaceSchema) {}
export class FlashcardsUpdateDTO extends createZodDto(FlashcardsUpdateSchema) {}
export class FlashcardUpdateDTO extends createZodDto(FlashcardSchema) {}
export class WorkspaceCardDTO extends createZodDto(WorkspaceCardSchema) {}
export class WorkspaceDetailDTO extends createZodDto(WorkspaceDetailSchema) {}
