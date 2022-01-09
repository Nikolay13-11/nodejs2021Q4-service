import { v4 as uuidv4 } from 'uuid'
import { IBoard, IColumns } from './models/board.model'


export class Board {
  id: string

  title: string

  columns: IColumns[]

  constructor({
    title = 'Title',
    columns = [{
      id: '1',
      title: 'title',
      order: '1'
    }],
  } = {}) {
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: IBoard):IBoard {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
