import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardsController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/boards.entity';
import { Task } from 'src/tssks/entities/task.entity';
import { LoginModule } from 'src/login/login.module';

@Module({
  controllers: [BoardsController],
  providers: [BoardService],
  imports: [TypeOrmModule.forFeature([Board, Task]), LoginModule],
})
export class BoardModule {}
