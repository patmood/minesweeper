var MineSweep = function(game, options){
  if (!game) console.error('No game found :(')
  this.game = game
  if (game.board) {
    console.log('Existing game')
    console.log(game)
    this.SIZE = game.board.length
    var board = this.reinstateBoard(game.board)
    this.board = board
    this.draw(board)
    this.revealCells()
  } else {
    console.log('New game')
    options = options || {}
    this.SIZE = options.gridSize || 5
    var numMines = options.mines || this.size
      , board = this.setBoard(this.SIZE)

    this.board = board
    this.setMines(board, numMines)
    this.countSurrounds(board)
    this.draw(board)
  }
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

  reinstateBoard: function(board) {
    return board.map(function(row, i) {
      return row.map(function(cell, j) {
        return new Cell(i, j, cell)
      })
    })
  },

  setBoard: function(n, existing) {
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
    $el.addClass('hide')
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

    console.log(this.board)
    this.game.board = this.board
    $.ajax({
      type: 'POST',
      data: { game: this.game },
      url: '/game/' + this.game._id,
      success: function(res) { console.log('success', res) },
      error: function(res) { console.log('error', res) }
    })

    if (gameOver) {
      alert('YOU WIN!')
    }
  },

  revealCells: function(board) {
    $('.cell').each(function() {
      if ($(this).data().orig.visible) {
        $(this).find('.cover').addClass('hide')
      }
    })
    this.checkGameStatus()
  }

}

