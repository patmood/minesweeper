var MineSweep = function(options){
  options = options || {}
  this.SIZE = options.gridSize || 5
  var numMines = options.mines || this.size
    , board = this.setBoard(this.SIZE)

  this.setMines(board, numMines)
  this.countSurrounds(board)
  this.draw(board)
}

MineSweep.prototype = {
  constructor: MineSweep,

  countSurrounds: function(board){
    for (var i = 0; i < board.length; i ++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] === 'X') continue;
        var count = 0
        if (board[i][j+1] === 'X') count++
        if (board[i][j-1] === 'X') count++
        if (i > 0) {
          if (board[i-1][j-1] === 'X') count++
          if (board[i-1][j] === 'X') count++
          if (board[i-1][j+1] === 'X') count++
        }
        if (i < board.length - 1) {
          if (board[i+1][j-1] === 'X') count++
          if (board[i+1][j] === 'X') count++
          if (board[i+1][j+1] === 'X') count++
        }
        board[i][j] = count
      }
    }
  },

  setBoard: function(n) {
    var board = []
    var i = n
    while (i--) {
      var row = []
        , j = n
      while (j--){
        row.push(0)
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
      var x, y

      // Get initial position
      x = this.getPos()
      y = this.getPos()

      // Ensure positions are unique
      while (board[y][x] === 'X') {
        x = this.getPos()
        y = this.getPos()
      }

      // Mark mine
      board[y][x] = "X"
    }

  },

  draw: function(board) {
    var $boardEl = $('#board')
      , _this = this
    board.forEach(function(row){
      var rowString = ''
      row.forEach(function(el) {
        rowString += '<div class="cell">' +
                        '<div class="cover">' +
                        '</div>' +
                        '<div class="count">' +
                          el +
                        '</div>' +
                      '</div>'
      })
      $boardEl.append('<div class="row">' + rowString + '</div>')
      var cssString = 'calc(100% / ' + this.SIZE + ')'
      $boardEl.find('.cell').css({
        'width': cssString,
        'height': cssString
      })
      $('.cover').on('click', _this.clickHandle)
    })
  },

  clickHandle: function(e) {
    $(this).hide()
  }

}



$(function(){
  new MineSweep({mines: 6, gridSize: 4})
})
