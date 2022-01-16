import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { IColumns } from '../boards/models/board.model'

@Entity()
export class ColumnClass{

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  title: string

  @Column()
  order: string

  constructor({
    title = 'Title',
    order = 'order'
  } = {}) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
  }

  static toResponse(column: IColumns):IColumns {
    const { id, title, order } = column;
    return { id, title, order };
  }
}
