const { v4: uuidv4 } =  require('uuid')

// class Board {
//   constructor({
//     id = uuidv4(),
//     title,
//     colums,
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.colums = colums;
//   }

//   static toResponse(board) {
//     const { id, title, colums } = board;
//     return { id, title, colums };
//   }
// }

function Board(t, c) {
  const board = {
    id: uuidv4(),
    title: t,
    columns: []
  }
  c.forEach(el => {
    board.columns.push(el)
  });
  return board
}

module.exports = Board;
