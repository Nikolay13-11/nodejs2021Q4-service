import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  async getAll(boardId: string): Promise<Task[]> {
    const allTasks = await this.tasksRepository.find({ boardId });
    return allTasks;
  }
  async getOneById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);
    if (!task) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Task not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return task;
  }
  async addNew(boardId: string, CreateTaskDto: CreateTaskDto) {
    const task = CreateTaskDto as Task;
    task.boardId = boardId;
    const newTask = await this.tasksRepository.create({ ...task });
    await this.tasksRepository.save(newTask);
    return newTask;
  }
  async update(
    id: string,
    task: UpdateTaskDto,
  ): Promise<Task | Partial<Task> | Error> {
    await this.tasksRepository.update(id, task);
    return await this.tasksRepository.findOne(id);
  }
  async delete(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
    return;
  }
}
