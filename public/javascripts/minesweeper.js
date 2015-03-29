var MineSweep = function(options){
  options = options || {}
  this.SIZE = options.gridSize || 5
  this.NUM_MINES = options.mines || this.size
  var board = this.setBoard(this.SIZE)
  this.board = board
  this.setMines(board)
  this.countSurrounds(board)
  this.draw(board)
}

MineSweep.prototype = {
  constructor: MineSweep,

  countSurrounds: function(board){

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

  setMines: function(board) {
    for (var i=0; i < this.SIZE; i++) {
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
  new MineSweep({mines: 3, gridSize: 4})
})
