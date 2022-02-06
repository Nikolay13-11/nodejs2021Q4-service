import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskService } from './task.service';

@Controller('boards')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly tasksService: TaskService) {}

  @Get(':boardId/tasks')
  async getAllTasks(@Param('boardId') boardId: string) {
    return await this.tasksService.getAll(boardId);
  }

  @Get(':boardId/tasks/:id')
  @HttpCode(HttpStatus.OK)
  async getOneTask(@Param('id') id: string) {
    return await this.tasksService.getOneById(id);
  }

  @Post(':boardId/tasks')
  async createTask(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return await this.tasksService.addNew(boardId, createTaskDto);
  }

  @Put(':boardId/tasks/:id')
  async updateTask(
    @Body() updateUserDto: UpdateTaskDto,
    @Param('id') id: string,
  ) {
    return await this.tasksService.update(id, updateUserDto);
  }

  @Delete(':boardId/tasks/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTask(@Param('id') id: string) {
    await this.tasksService.delete(id);
    return;
  }
}
