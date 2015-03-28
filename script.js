var NUM_MINES = 2
  , SIZE = 4

function drawBoard() {
  var board = [[0, 0, 0, 0]
              ,[0, 0, 0, 0]
              ,[0, 0, 0, 0]
              ,[0, 0, 0, 0]]

  for (var i=0; i < 2; i++) {
    var x, y

    x = Math.floor(Math.random() * SIZE)
    y = Math.floor(Math.random() * SIZE)
    while (board[y][x] === 'X') {
      x = Math.floor(Math.random() * SIZE)
      y = Math.floor(Math.random() * SIZE)
    }
    console.log(x, y)
    board[y][x] = "X"
  }

  console.log(board)

  draw(board)
  // populate the numbers of adjacent mines
  return board
}

function draw(board) {
  var $board = $('#board')
  board.forEach(function(row){
    var rowString = ''
    row.forEach(function(el) {
      rowString += '<div class="cell"><div class="cover"><p>' + el + '</p></div></div>'
    })
    $board.append('<div class="row">' + rowString + '</div>')
    $('.cover').on('click', clickHandle)
  })
}

function clickHandle(e) {
  $(e.target).css('background', 'none').find('p').show()
}


$(function(){

  drawBoard()

})
