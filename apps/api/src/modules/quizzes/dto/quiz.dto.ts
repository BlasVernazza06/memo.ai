import { createZodDto } from 'nestjs-zod';
import { QuizCardSchema, QuizDetailSchema } from '@repo/validators';

export class QuizCardDTO extends createZodDto(QuizCardSchema) {}
export class QuizDetailDTO extends createZodDto(QuizDetailSchema) {}
