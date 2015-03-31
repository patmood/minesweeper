var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/minesweeper')
var games = db.get('games')

router.get('/', function(req, res) {
  games.insert({}).then(function(game) {
    res.redirect('/game/' + game._id)
  })
});

router.get('/game/:id', function(req, res) {
  // Fetch game
  games.findById(req.params.id).then(function(game) {
    res.render('index', { game: JSON.stringify(game) });
  })
})

router.post('/game/:id', function(req, res) {
  // Save game
  // games.findById(req.params.id).then(function(game) {
  //   res.render('index', { game: JSON.stringify(game) });
  // })
  games.update({_id: req.params.id}, req.body.game).then(function() {
    res.send('done')
  })
})

module.exports = router;
