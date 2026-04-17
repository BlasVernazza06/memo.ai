import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { User } from '@/common/decorators/user.decorator';
import { QuizzesService } from '../services/quizzes.service';

@Controller('quizzes')
@UseGuards(AuthGuard)
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  async findAll(@User('id') userId: string) {
    return await this.quizzesService.findAllByUser(userId);
  }

  @Get('workspace/:workspaceId')
  async findByWorkspace(
    @User('id') userId: string,
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
  ) {
    return await this.quizzesService.findByWorkspace(userId, workspaceId);
  }

  @Get(':id')
  async findById(
    @User('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.quizzesService.findById(userId, id);
  }
}
