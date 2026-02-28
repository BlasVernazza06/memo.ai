import { createZodDto } from 'nestjs-zod';

import { CreateWorkspaceSchema, UpdateWorkspaceSchema } from '@repo/validators';

export class CreateWorkspaceDto extends createZodDto(CreateWorkspaceSchema) {}
export class UpdateWorkspaceDto extends createZodDto(UpdateWorkspaceSchema) {}
