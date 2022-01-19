import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Task } from '../tasks/task.model'
import { IBoard, IColumns } from './models/board.model'

@Entity()
export class Board extends BaseEntity{

  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column()
  title!: string

  @Column({type: 'json'})
  columns: IColumns[] = []

  @OneToMany(() => Task, (task) => task.board)
  tasks!: Task[];
}
