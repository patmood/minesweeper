var Cell = function(row, col, config) {
  config = config || {}
  this.row = row
  this.col = col
  this.isMine = config.isMine ? config.isMine === 'true' : false
  this.visible = config.isMine ? config.visible === 'true' : false
  this.count = config.isMine ? parseInt(config.count) : 0
}

Cell.prototype = {
  constructor: Cell,

  render: function() {
    return  '<div class="cell">' +
              '<div class="cover">' +
              '</div>' +
              '<div class="count">' +
                (this.isMine ? 'X' : this.count) +
              '</div>' +
            '</div>'
  },

  setCount: function(board) {
    if (this.isMine || !board) return;
    var count = 0
      , row = board[this.row]

    // mines in this row
    if ((row[this.col+1] || {}).isMine) count++
    if ((row[this.col-1] || {}).isMine) count++

    // mines above
    if (this.row > 0) {
      row = board[this.row - 1]
      if ((row[this.col-1] || {}).isMine) count++
      if ((row[this.col] || {}).isMine) count++
      if ((row[this.col+1] || {}).isMine) count++
    }

    // mines below
    if (this.row < board.length - 1) {
      row = board[this.row + 1]
      if ((row[this.col-1] || {}).isMine) count++
      if ((row[this.col] || {}).isMine) count++
      if ((row[this.col+1] || {}).isMine) count++
    }
    this.count = count
  }


}
