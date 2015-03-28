var MineSweep = function(){
  this.NUM_MINES = 2
  this.SIZE = 4
  this.board = [[0, 0, 0, 0]
               ,[0, 0, 0, 0]
               ,[0, 0, 0, 0]
               ,[0, 0, 0, 0]]

  this.drawBoard()
}

MineSweep.prototype = {
  constructor: MineSweep,

  getPos: function() {
    return Math.floor(Math.random() * this.SIZE)
  },

  drawBoard: function() {
    for (var i=0; i < 2; i++) {
      var x, y

      // Get initial position
      x = this.getPos()
      y = this.getPos()

      // Ensure positions are unique
      while (this.board[y][x] === 'X') {
        x = this.getPos()
        y = this.getPos()
      }
      console.log(x, y)
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
        rowString += '<div class="cell"><div class="cover"><p>' + el + '</p></div></div>'
      })
      $boardEl.append('<div class="row">' + rowString + '</div>')
      $('.cover').on('click', _this.clickHandle)
    })
  },

  clickHandle: function(e) {
    $(this).css('background', 'none').find('p').show()
  }

}



$(function(){
  new MineSweep()
})
