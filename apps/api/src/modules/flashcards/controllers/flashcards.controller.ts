import { Controller, Get, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@thallesp/nestjs-better-auth';
import { User } from '@/common/decorators/user.decorator';
import { FlashcardsService } from '../services/flashcards.service';

@Controller('flashcards')
@UseGuards(AuthGuard)
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Get()
  async findAll(@User('id') userId: string) {
    return await this.flashcardsService.findAllByUser(userId);
  }

  @Get('workspace/:workspaceId')
  async findByWorkspace(
    @User('id') userId: string,
    @Param('workspaceId', ParseUUIDPipe) workspaceId: string,
  ) {
    return await this.flashcardsService.findByWorkspace(userId, workspaceId);
  }

  @Get(':id')
  async findById(
    @User('id') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return await this.flashcardsService.findById(userId, id);
  }
}
