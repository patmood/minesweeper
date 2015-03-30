var Cell = function(row, col) {
  this.row = row
  this.col = col
  this.isMine = false
  this.visible = false
  this.count = 0
}

Cell.prototype = {
  constructor: Cell,

  render: function() {
    if (this.isMine) {
      return 'X'
    } else {
      return this.count
    }
  },

  setCount: function(board) {
    if (this.isMine) return;
    var count = 0
      , row = board[this.row]
    if ((row[this.col+1] || {}).isMine) count++
    if ((row[this.col-1] || {}).isMine) count++
    if (this.row > 0) {
      row = board[this.row - 1]
      if ((row[this.col-1] || {}).isMine) count++
      if ((row[this.col] || {}).isMine) count++
      if ((row[this.col+1] || {}).isMine) count++
    }
    if (this.row < board.length - 1) {
      row = board[this.row + 1]
      if ((row[this.col-1] || {}).isMine) count++
      if ((row[this.col] || {}).isMine) count++
      if ((row[this.col+1] || {}).isMine) count++
    }
    this.count = count
  }


}
