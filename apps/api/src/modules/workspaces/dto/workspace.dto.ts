import { createZodDto } from 'nestjs-zod';

import {
  CreateWorkspaceSchema,
  FlashcardSchema,
  FlashcardUpdateSchema,
  FlashcardsUpdateSchema,
  UpdateWorkspaceSchema,
  WorkspaceCardSchema,
} from '@repo/validators';

export class CreateWorkspaceDto extends createZodDto(CreateWorkspaceSchema) {}
export class UpdateWorkspaceDto extends createZodDto(UpdateWorkspaceSchema) {}
export class FlashcardsUpdateDto extends createZodDto(FlashcardsUpdateSchema) {}
export class FlashcardUpdateDto extends createZodDto(FlashcardSchema) {}
export class WorkspaceCardDto extends createZodDto(WorkspaceCardSchema) {}
