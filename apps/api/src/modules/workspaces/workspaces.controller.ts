import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import {
  AuthGuard,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';

import { type DbWorkspace } from '@repo/db';

import { CreateWorkspaceDto, UpdateWorkspaceDto } from './dto/workspace.dto';
import { WorkspacesService } from './workspaces.service';

@Controller('workspaces')
@UseGuards(AuthGuard)
export class WorkspacesController {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Post()
  async create(
    @Session() session: UserSession,
    @Body() data: CreateWorkspaceDto,
  ): Promise<{ id: string }> {
    return this.workspacesService.createWorkspace(session.user.id, data);
  }

  @Get()
  async findAll(@Session() session: UserSession): Promise<DbWorkspace[]> {
    return this.workspacesService.findAll(session.user.id);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Session() session: UserSession,
  ): Promise<DbWorkspace> {
    return this.workspacesService.findOne(id, session.user.id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Session() session: UserSession,
    @Body() data: UpdateWorkspaceDto,
  ): Promise<{ success: boolean }> {
    return this.workspacesService.update(id, session.user.id, data);
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Session() session: UserSession,
  ): Promise<{ success: boolean }> {
    return this.workspacesService.remove(id, session.user.id);
  }
}
