import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tssks/entities/task.entity';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/boards.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}
  async getAll(): Promise<Board[]> {
    const allBoards = await this.boardsRepository.find();
    return allBoards;
  }
  async getOneById(id: string): Promise<Board> {
    const board = await this.boardsRepository.findOne(id);
    if (!board) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Board not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return board;
  }
  async addNew(board: CreateBoardDto): Promise<Board> {
    const newBoard = await this.boardsRepository.create({ ...board });
    await this.boardsRepository.save(newBoard);
    return newBoard;
  }
  async update(
    id: string,
    board: UpdateBoardDto,
  ): Promise<Board | Partial<Board> | Error> {
    await this.boardsRepository.update(id, board);
    return await this.boardsRepository.findOne(id);
  }
  async delete(id: string): Promise<void> {
    await this.tasksRepository.delete({ boardId: id });
    await this.boardsRepository.delete(id);
    return;
  }
}
