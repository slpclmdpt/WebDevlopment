const currentTurn = {turn : 0};
const message = {msg : "Not guessed yet. Must click start button to begin a new game."};
const wordLength = {length: 0};
const preGuessed = [];
const currentSecret = {result : ""};

const check = {
  currentTurn,
  message,
  wordLength,
  preGuessed,
  currentSecret,
  produceAnswer,
  addGuessed,
  isValid
};


function produceAnswer(word){
	return word.wordList[Math.floor(Math.random()*word.wordList.length)];
}

function addGuessed(secret, answer){
	const commonLetters = {number : 0};
	secret = secret.toLowerCase();
	answer = answer.toLowerCase();
	for(let index = 0; index < answer.length; index++){	
		if(!(secret.indexOf(answer.charAt(index)) === -1)){
			commonLetters.number++;
			secret = secret.replace(answer.charAt(index),'');
		}
	}
	preGuessed.push({word : answer.toUpperCase(), commons : commonLetters.number});
	return commonLetters.number;
}

function isValid(word, answer){
	if(word.wordList.indexOf(answer) === -1 ){
		message.msg = `Word is not one of the permitted words! You can enter a new word.`;
	}
	else if(answer === currentSecret.result){
		currentTurn.turn ++;
		message.msg = `You have won in ${currentTurn.turn} turns! You can start a new game.`;
	}else{
		currentTurn.turn ++;
		message.msg = `${addGuessed(currentSecret.result, answer)} mathch(es). Try again.`;
	}
}

module.exports = check;