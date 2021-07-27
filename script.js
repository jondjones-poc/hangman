const resetBtn = document.getElementById('reset-btn');
const keyboard = document.getElementById('keyboard');
const maxWrongEl = document.getElementById('maxWrong');
const wordSpotLightEl = document.getElementById('wordspotlight');
const mistakesEl = document.getElementById('mistakes');
const hangmanPicture = document.getElementById('hangman-picture');
const MAX_WRONG = 6

let answer = '';
let mistakes = 0;
let guessed = [];

const getRandomWord = async () => {

    const response = await fetch('https://random-word-api.herokuapp.com/word?number=1')
    const words = await response.json();
    return words[0];
}

const handleGuess = (e) => {
    const chosenLetter = e.toElement.id;
    if (guessed.indexOf() === -1)
    {
        guessed.push(chosenLetter);
    }

    e.srcElement.setAttribute('disabled', true);
    const currentGuess =  playTurn();
    if (answer.indexOf(chosenLetter) <= 1) {
        mistakes++;
        mistakesEl.innerHTML = mistakes;
        hangmanPicture.setAttribute('src', `images/${mistakes}.jpg`)
    }

    if (mistakes >= MAX_WRONG) {
        wordSpotLightEl.innerHTML = "YOU LOSE";
    } else if (currentGuess === answer) {
        wordSpotLightEl.innerHTML = "YOU WIN";
    }
}

const generateButtons = () => {
    'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => {
        const letterButton = document.createElement('button');
        letterButton.id = letter;
        letterButton.innerHTML = letter;
        letterButton.classList.add("btn", "btn-lg", "btn-primary", "m-s");

        letterButton.addEventListener('click', handleGuess);
        keyboard.appendChild(letterButton);
    });
}

const playTurn = () => {
    const wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    wordSpotLightEl.innerHTML = wordStatus;
    return wordStatus;
}

const startGame = () => {
    generateButtons();

    mistakes = 0;
    guessed = [];
    maxWrongEl.innerHTML = MAX_WRONG;
    hangmanPicture.setAttribute('src', `images/0.jpg`)

    getRandomWord().then(word => {
       answer = word;
       playTurn();
    });
}

resetBtn.addEventListener('click', () => {
    startGame();
})

startGame();

