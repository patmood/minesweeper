var MineSweep = function(options){
  options = options || {}
  this.SIZE = options.gridSize || 4
  this.NUM_MINES = options.mines || this.size
  this.setBoard(this.SIZE)
  this.drawBoard()
}

MineSweep.prototype = {
  constructor: MineSweep,

  setBoard: function(n) {
    this.board = []
    var i = n
    while (i--) {
      var row = []
        , j = n
      while (j--){
        row.push(0)
      }
      this.board.push(row)
    }
    return this.board
  },

  getPos: function() {
    return Math.floor(Math.random() * this.SIZE)
  },

  drawBoard: function() {
    for (var i=0; i < this.SIZE; i++) {
      var x, y

      // Get initial position
      x = this.getPos()
      y = this.getPos()

      // Ensure positions are unique
      while (this.board[y][x] === 'X') {
        x = this.getPos()
        y = this.getPos()
      }

      // Mark mine
      this.board[y][x] = "X"
    }

    // TODO: populate the numbers of adjacent mines
    this.draw()

  },

  draw: function() {
    var $boardEl = $('#board')
      , _this = this
    this.board.forEach(function(row){
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
      $('.cover').on('click', _this.clickHandle)
    })
  },

  clickHandle: function(e) {
    $(this).hide()
  }

}



$(function(){
  new MineSweep({mines: 3, gridSize: 10})
})
