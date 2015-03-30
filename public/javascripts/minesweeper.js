var MineSweep = function(options){
  options = options || {}
  this.SIZE = options.gridSize || 5
  var numMines = options.mines || this.size
    , board = this.setBoard(this.SIZE)

  this.board = board
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
    var $board = $('#board')

    board.forEach(function(row){
      var $row = $('<div class="row"></div>')
      row.forEach(function(el) {
        var $el = $(el.render()).data('orig', el)
        $row.append($el)
      })
      $board.append($row)
    })

    // Size board based on number of cells
    var cssString = 'calc(100% / ' + board[0].length + ')'
    $board.find('.cell').css({
      'width': cssString,
      'height': cssString
    })

    // Add click handler
    $('.cover').on('click', { checkGameStatus: this.checkGameStatus.bind(this) }, this.clickHandle)
  },

  clickHandle: function(e) {
    $el = $(this)
    $el.hide()
    var cell = $el.parent().data()
    if (cell.orig.isMine) {
      alert('GAME OVER!')
    } else {
      cell.orig.visible = true  // This does not change the original object
      e.data.checkGameStatus()
    }
  },

  checkGameStatus: function(){
    var gameOver = true
    this.board.forEach(function(row) {
      row.forEach(function(cell) {
        if (cell.isMine) {
          return;
        } else if (!cell.visible) {
          return gameOver = false
        }
      })
    })

    if (gameOver) {
      alert('YOU WIN!')
    }
  }

}

