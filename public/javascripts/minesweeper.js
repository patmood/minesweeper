var MineSweep = function(options){
  options = options || {}
  this.SIZE = options.gridSize || 5
  var numMines = options.mines || this.size
    , board = this.setBoard(this.SIZE)

  console.log(board)
  this.setMines(board, numMines)
  this.countSurrounds(board)
  this.draw(board)
}

MineSweep.prototype = {
  constructor: MineSweep,

  countSurrounds: function(board){
    board.forEach(function(row) {
      row.forEach(function(cell) {
        cell.setCount(board)
      })
    })
  },

  setBoard: function(n) {
    var board = []
    var i = n
    while (i--) {
      var row = []
        , j = n
      while (j--){
        row.push(new Cell(i, j))
      }
      board.push(row)
    }
    return board
  },

  getPos: function() {
    return Math.floor(Math.random() * this.SIZE)
  },

  setMines: function(board, numMines) {
    for (var i=0; i < numMines; i++) {
      var col, row

      // Get initial position
      col = this.getPos()
      row = this.getPos()

      // Ensure positions are unique
      while (board[row][col] === 'X') {
        col = this.getPos()
        row = this.getPos()
      }

      // Mark mine
      board[row][col].isMine = true
    }

  },

  draw: function(board) {
    var $boardEl = $('#board')

    board.forEach(function(row){
      var rowString = ''
      row.forEach(function(el) {
        rowString += el.render()
      })
      $boardEl.append('<div class="row">' + rowString + '</div>')
    })

    // Size board based on number of cells
    var cssString = 'calc(100% / ' + board[0].length + ')'
    $boardEl.find('.cell').css({
      'width': cssString,
      'height': cssString
    })

    // Add click handler
    $('.cover').on('click', this.clickHandle)
  },

  clickHandle: function(e) {
    $(this).hide()
  }

}

