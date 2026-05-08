import { createZodDto } from 'nestjs-zod';

import {
  CreateWorkspaceSchema,
  FlashcardsUpdateSchema,
  FlashcardUpdateSchema,
  FlashcardSchema,
  UpdateWorkspaceSchema,
} from '@repo/validators';

export class CreateWorkspaceDto extends createZodDto(CreateWorkspaceSchema) {}
export class UpdateWorkspaceDto extends createZodDto(UpdateWorkspaceSchema) {}
export class FlashcardsUpdateDto extends createZodDto(FlashcardsUpdateSchema) {}
export class FlashcardUpdateDto extends createZodDto(FlashcardSchema) {}
