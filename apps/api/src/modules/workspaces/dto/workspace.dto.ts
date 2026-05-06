import { createZodDto } from 'nestjs-zod';

import {
  CreateWorkspaceSchema,
  FlashcardsUpdateSchema,
  UpdateWorkspaceSchema,
} from '@repo/validators';

export class CreateWorkspaceDto extends createZodDto(CreateWorkspaceSchema) {}
export class UpdateWorkspaceDto extends createZodDto(UpdateWorkspaceSchema) {}
export class FlashcardsUpdateDto extends createZodDto(FlashcardsUpdateSchema) {}
