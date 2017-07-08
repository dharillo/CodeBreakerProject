let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
const ICON_OK = 'glyphicon glyphicon-ok';
const ICON_TRANSFER = 'glyphicon glyphicon-transfer';
const ICON_REMOVE = 'glyphicon glyphicon-remove';

/**
 * Function called every time that the user submits a new
 * value trying to guess the hidden value.
 */
function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value === '' || attempt.value === '') {
        setHiddenFields();
    }

    if (!validateInput(input.value)) {
        return false;
    }

    attempt.value = 1 + parseInt(attempt.value);
    if (getResults(input.value)) {
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    } else if (attempt.value >= 10) {
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    } else {
        setMessage('Incorrect, try again.');
    }
}

//implement new functions here
/**
 * Sets the initial values for the hidden fields, generating
 * the number that the user must guess.
 */
function setHiddenFields() {
    // Calculate a number between 0 and 9999 and store it as a string
    // of length 4
    let rand = Math.floor(Math.random() * 9999).toString();
    while(rand.length < 4) {
        rand = `0${rand}`;
    }
    answer.value = rand;
    // Reset the number of attempts
    attempt.value = 0;
}

/**
 * Shows the given message to the user.
 * @param {string} message Message to display to the user
 */
function setMessage(message) {
    let messageEl = document.getElementById('message');
    messageEl.innerHTML = message;
}

/**
 * Checks that the input given by the user has 4 numbers
 * @param {string} input Value inserted by the user
 */
function validateInput(input) {
    if (input && input.length === 4) {
        return true;
    }
    setMessage('Guesses must be exactly 4 characters long.');
    return false;
}

/**
 * Modifies the HTML to diplay the result of the given input to
 * the user.
 * @param {string} input Value inserted by the user 
 */
function getResults(input) {
    let guessContainer = document.createElement('div');
    let userGuessNumber = document.createElement('span');
    let resultDisplay = document.createElement('div');
    let numCorrectNumbers = 0;

    guessContainer.appendChild(userGuessNumber);
    guessContainer.appendChild(resultDisplay);

    guessContainer.className = 'row';
    
    userGuessNumber.className = 'col-md-6';
    userGuessNumber.innerText = input;

    resultDisplay.className = 'col-md-6';
    for (let i = 0, answerNumber = answer.value, cipherIcon, inputChar; i < 4; i++) {
        cipherIcon = document.createElement('span');
        inputChar = input.charAt(i);
        if (inputChar === answerNumber.charAt(i)) {
            cipherIcon.className = ICON_OK;
            numCorrectNumbers ++;
        } else if (answerNumber.indexOf(inputChar) !== -1) {
            cipherIcon.className = ICON_TRANSFER;
        } else {
            cipherIcon.className = ICON_REMOVE;
        }
        resultDisplay.appendChild(cipherIcon);
    }

    document.getElementById('results').appendChild(guessContainer);

    return numCorrectNumbers === 4;
}

function showAnswer(hasWon) {
    var codeEl = document.getElementById('code');
    codeEl.innerHTML = answer.value
    if (hasWon) {
        codeEl.className += ' success';
    } else {
        codeEl.className += ' failure';
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}