import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Board } from '../boards/boards.model';
import { User } from '../users/user.model';
import { ITask } from "./models/task.model";

@Entity()
export class Task extends BaseEntity{

  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'SET NULL'})
  @JoinColumn({ name: 'userId' })
  user!: string;

  @Column({ nullable: true })
  userId!: string | null;

  @ManyToOne(() => Board, (board) => board.tasks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'boardId' })
  board!: string;

  @Column({ nullable: true })
  boardId!: string;

  @Column({nullable:true})
  columnId!: string;
}
