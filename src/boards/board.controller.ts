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
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardService } from './board.service';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardsController {
  constructor(private readonly boardsService: BoardService) {}

  @Get()
  async getAllBoards() {
    return await this.boardsService.getAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOneBoard(@Param('id') id: string) {
    return await this.boardsService.getOneById(id);
  }

  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    return await this.boardsService.addNew(createBoardDto);
  }

  @Put(':id')
  async updateBoard(
    @Body() updateUserDto: UpdateBoardDto,
    @Param('id') id: string,
  ) {
    return await this.boardsService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeBoard(@Param('id') id: string) {
    await this.boardsService.delete(id);
    return;
  }
}
