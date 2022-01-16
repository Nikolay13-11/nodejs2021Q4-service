import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { IBoard, IColumns } from './models/board.model'

@Entity()
export class Board extends BaseEntity{

  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  title: string

  // @OneToOne(() => ColumnClass)
  // columns: ColumnClass[]

  @Column('json', {nullable: true})
  columns: IColumns[] | null

  constructor({
    title = 'Title',
    columns = []
  } = {}) {
    super()
    this.id = uuidv4();
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board: IBoard):IBoard {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}
