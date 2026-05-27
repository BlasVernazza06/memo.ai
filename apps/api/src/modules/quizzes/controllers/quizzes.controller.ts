import { Controller, Get, Param, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { User } from '@/common/decorators/user.decorator';
import { QuizzesService } from '../services/quizzes.service';
import { QuizCardDTO, QuizDetailDTO } from '../dto/quiz.dto';

@Controller('quizzes')
@UseGuards(AuthGuard)
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  async findAll(@User('id') userId: string): Promise<QuizCardDTO[]> {
    return await this.quizzesService.findAllByUser(userId);
  }

  @Get('workspace/:workspaceId')
  async findByWorkspace(
    @User('id') userId: string,
    @Param('workspaceId') workspaceId: string,
  ): Promise<QuizCardDTO[]> {
    return await this.quizzesService.findByWorkspace(userId, workspaceId);
  }

  @Get(':id')
  async findById(
    @User('id') userId: string,
    @Param('id') id: string,
  ): Promise<QuizDetailDTO> {
    return await this.quizzesService.findById(userId, id);
  }

  @Post(':id/complete')
  async completeQuiz(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body('score') score: number,
  ) {
    const newlyUnlocked = await this.quizzesService.completeQuiz(userId, id, score);
    return {
      success: true,
      newlyUnlocked,
    };
  }
}
