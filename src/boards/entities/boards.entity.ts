import { Task } from 'src/tssks/entities/task.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

interface IColumns {
  id: string;
  title: string;
  order: string;
}

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column({ type: 'json' })
  columns: IColumns[] = [];

  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];
}
