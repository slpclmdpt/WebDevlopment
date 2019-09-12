const express = require('express');
const app = express();
const PORT = 3000;

const word = require('./word');
const wordGameWeb = require('./word-game-web');
const check = require('./check')


app.use(express.static('./public'));

app.get('/', (req, res) => {
	res.send(wordGameWeb.gamePage(word,check));
});

app.get('/start', (req, res) => {
	let result = check.produceAnswer(word);
	console.log(result);
	check.currentSecret.result = result;
	check.currentTurn.turn = 0;
	check.preGuessed.length = 0;
	check.message.msg = "Not guessed yet. Must click start button to begin a new game."
	check.wordLength.length = result.length;
	res.send(wordGameWeb.gamePage(word,check));
});

app.post('/check', express.urlencoded({ extended: false }), (req, res) => {
  	check.isValid(word, req.body.word);
  	res.redirect('/');
});




app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));