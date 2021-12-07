const { v4: uuidv4 } =  require('uuid')
import { IBoard, IColumns } from './models/board.model'

export class Board {
  id: string
  title: string
  columns: null
  constructor({
    id = uuidv4(),
    title = '',
    columns = null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: IBoard):IBoard {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
