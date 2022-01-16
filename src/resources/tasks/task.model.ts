import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ITask } from "./models/task.model";

@Entity()
export class Task extends BaseEntity{

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @Column({
    type: 'text',
    nullable: true
  })
  userId: string | null;

  @Column()
  boardId: string;

  @Column({nullable:true})
  columnId: string;
 
  constructor({
    id = uuidv4(),
    title = 'Title',
    order = 1,
    description = '',
    userId = '',
    boardId = '',
    columnId = ''
  } = {}) {
    super()
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: ITask) {
    const {
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    } = task;
    return {
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    };
  }
}
