const { v4: uuidv4 } =  require('uuid')

class Board {
  constructor({
    id = uuidv4(),
    title,
    columns,
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

// function Board(t, c) {
//   const board = {
//     id: uuidv4(),
//     title: t,
//     columns: []
//   }
//   c.forEach(el => {
//     board.columns.push(el)
//   });
//   return board
// }

module.exports = Board;
