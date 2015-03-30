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
      board[y][x].isMine = true
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
                          el.render() +
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

