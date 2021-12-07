import { v4 as uuidv4 } from 'uuid';
import { ITask } from "./models/task.model";

export class Task {
  id: string;

  title: string;

  order: string;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
    id = uuidv4(),
    title = 'Title',
    order = 'Oreder',
    description = '',
    userId = null,
    boardId = null,
    columnId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static toResponse(task: ITask): ITask {
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
