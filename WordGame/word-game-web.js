const wordGameWeb = {
  gamePage: function(word, check) {
    return `
      <!DOCTYPE html>
        <html>
          <head>
            <link rel="stylesheet" href="/game.css"/>
            <title>Word Guessing Game</title>
          </head>
          <body>
            <div id="word-app">
              <div class="word-div">
                <div class="word-div__valid">
                  <p class="word-div__title">Valid Words</p>
                  ${wordGameWeb.getValidWordList(word)}
                </div>
                <div class="word-div__guessed">  
                  <p class="word-div__title">Guessed words|Common letters </p>   
                  ${wordGameWeb.getGuessedWordList(check)}
                </div>
              </div>
              <div class="play-information-div">
                <div class="play-information-div__current-turns">Current turn(s) taken: ${check.currentTurn.turn}</div>
                <div class="play-information-div__message">${check.message.msg}</div>
                <div class="play-information-div__input-field">
                  <form action="/check" method="POST">
                    <label>
                      Enter a word
                      <input name="word" type="text"/>
                    </label>
                    <button type="submit">Guess</button>
                  </form>
                </div>
                <div class="play-information-div__restart-button">
                  <form action="/start" method="GET">
                    <button type="submit">Start/Restart</button>
                  </form>
                </div>
              </div>
            </div>
          </body>
        </html>
  `;
  },
  getValidWordList: function(word) {
    return  `<ul class="word-div__valid-list">` +
      word.wordList.map( word => `
        <li>
          <div class="word-div__valid-list-item">
            <span class="word-div__word">${word}</span>
          </div>
        </li>
        `).join('') +
      `</ul>`;
  },
  getGuessedWordList: function(check) {
    return  `<ul class="word-div__guessed-list">` +
      check.preGuessed.map( word => `
        <li>
          <div class="word-div__guessed-list-item">
             <span class="word-div__word">${word.word}</span>
             <span class="word-div__times">${word.commons}</span>
          </div>
        </li>
        `).join('') +
      `</ul>`;
  }
};

module.exports = wordGameWeb;