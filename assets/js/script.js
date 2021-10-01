//global variable definitions
var startBtnEl = document.querySelector('#startBtn'); //sets var for start button
var mainHead = document.querySelector('#main-head'); //sets var for main h1 element
var mainP = document.querySelector('#main-p'); //sets var for main paragraph element
var timerEl = document.querySelector('#timer'); //set var for timer element
var pageContentEl = document.querySelector('.page-content');
var highscoreBtnEl = document.querySelector('.view-high-score');

var questionCount = 0; //counts how many questions have been asked
var questionNum = {}; //empty object to pass questions through

var timeLeft = 0; //set timer to 75
timerEl.textContent = 'Time: ' + timeLeft;

//set var for whether or not user got answer right
var correctAns = document.createElement('div');
correctAns.className = 'user-answer'
correctAns.textContent = 'CORRECT!'
var incorrectAns = document.createElement('div');
incorrectAns.className = 'user-answer'
incorrectAns.textContent = 'WRONG!'

//create question objects
var questionOne = { question: 'Commonly used data types do NOT include:', answerOne: 'Strings', answerTwo: 'Booleans', answerThree: 'Alerts', answerFour: 'Numbers', solution: 'question-btn-three' };

var questionTwo = { question: 'The condition in an if/else statement is enclosed with:', answerOne: 'Quotes', answerTwo: 'Curly Brackets', answerThree: 'Parenthesis', answerFour: 'Square Brackets', solution: 'question-btn-two' };

var questionThree = { question: 'A useful tool used during debugging to print content to the debugger is:', answerOne: 'JavaScript', answerTwo: 'For Loops', answerThree: 'Terminal/Bash', answerFour: 'console.log', solution: 'question-btn-four' };

var questionFour = { question: 'Arrays can be used to store:', answerOne: 'Numbers and Strings', answerTwo: 'Other Arrays', answerThree: 'Booleans', answerFour: 'All of the Above', solution: 'question-btn-four' };

var questionFive = { question: 'String values must be enclosed within ___ when being assigned to variables.', answerOne: 'Quotes', answerTwo: 'Curly Brackets', answerThree: 'Parenthesis', answerFour: 'Square Brackets', solution: 'question-btn-one' };

//create question HTML elements
var questionHead = document.createElement('h1'); //create h1 element
questionHead.className = 'question-head';
var questionDiv = document.createElement('ol'); //create ordered list element
questionDiv.className = 'question-list'
var questionBtnOne = document.createElement('button'); //create button element
questionBtnOne.className = 'question-btn-one'
var questionBtnTwo = document.createElement('button'); //create button element
questionBtnTwo.className = 'question-btn-two'
var questionBtnThree = document.createElement('button'); //create button element
questionBtnThree.className = 'question-btn-three'
var questionBtnFour = document.createElement('button'); //create button element
questionBtnFour.className = 'question-btn-four'

//create highscore input element
var scoreForm = document.createElement('form');
//scoreForm.onsubmit = console.log('hit');

var userScore = document.createElement('input');
userScore.className = 'user-score';
userScore.type = 'text';
userScore.placeholder = 'Enter initials';
scoreForm.appendChild(userScore);

var scoreBtn = document.createElement('button');
scoreBtn.type = 'submit'
scoreBtn.textContent = 'Submit Highscore'
scoreForm.appendChild(scoreBtn);

var goBackBtn = document.createElement('button'); //create Go Back button
goBackBtn.className = ('go-back')
goBackBtn.textContent = 'Go Back'

var clearScoreBtn = document.createElement('button'); //create clear highscore button
clearScoreBtn.className = 'clear-score'
clearScoreBtn.textContent = 'Clear Highscores'

var startGame = function () {
    timeLeft = 75; //set timer to initial value
    mainHead.remove(); //removes initial main heading
    mainP.remove(); //removes initial main paragraph
    startBtnEl.remove(); //removes start button

    timeInt = setInterval(function () { //declare global variable for timer
        if (timeLeft > 0) {
            timerEl.textContent = 'Time: ' + timeLeft; //write timeLeft to the timer element
            timeLeft--; //decrement timer every interval
        } else {
            timerEl.textContent = ''; //remove timer from screen
            clearInterval(timeInt); //clear timer
            stopGame();
        }
    }, 1000);

    createQuestion();
}

var createQuestion = function () { //generates a question from the list
    questionCount++;
    if (questionCount === 1) {
        questionNum = questionOne;
    } else if (questionCount === 2) {
        questionNum = questionTwo;
    } else if (questionCount === 3) {
        questionNum = questionThree;
    } else if (questionCount === 4) {
        questionNum = questionFour;
    } else if (questionCount === 5) {
        questionNum = questionFive;
    }

    questionHead.textContent = questionNum.question;
    pageContentEl.appendChild(questionHead);    //add h1 to page (question)

    pageContentEl.appendChild(questionDiv); //add ol to page (container)

    questionBtnOne.textContent = questionNum.answerOne;
    questionDiv.appendChild(questionBtnOne); //add button to ol (option 1)

    questionBtnTwo.textContent = questionNum.answerTwo;
    questionDiv.appendChild(questionBtnTwo); //add button to ol (option 2)

    questionBtnThree.textContent = questionNum.answerThree;
    questionDiv.appendChild(questionBtnThree); //add button to ol (option 3)

    questionBtnFour.textContent = questionNum.answerFour;
    questionDiv.appendChild(questionBtnFour); //add button to ol (option 4)

    // var questionBtnEl = document.querySelector('.question-list');
    // questionBtnEl.addEventListener('click', newQuestion); //listens for click on the question buttons

    // listen for click on buttons
    var questionOneBtnEl = document.querySelector('.question-btn-one');
    questionOneBtnEl.addEventListener('click', newQuestion); 
    var questionTwoBtnEl = document.querySelector('.question-btn-two');
    questionTwoBtnEl.addEventListener('click', newQuestion); 
    var questionThreeBtnEl = document.querySelector('.question-btn-three');
    questionThreeBtnEl.addEventListener('click', newQuestion); 
    var questionFourBtnEl = document.querySelector('.question-btn-four');
    questionFourBtnEl.addEventListener('click', newQuestion); 
}

var newQuestion = function (event) {
    correctAns.remove();
    incorrectAns.remove();

    var btnPressed = event.target; //define btnPressed as whichever button was clicked
    if (btnPressed.className === questionNum.solution && questionCount < 5) { //check if the button is the same as the solution   
        createQuestion();
        pageContentEl.appendChild(correctAns);
    } else if (btnPressed.className != questionNum.solution && questionCount < 5) {
        timeLeft -= 10;
        createQuestion();
        pageContentEl.appendChild(incorrectAns);
    } else if (btnPressed.className === questionNum.solution) { //check if it is the last question
        stopGame();
        return;
    } else {
        timeLeft -= 10;
        stopGame();
        return;
    }
}

function stopGame() { //once the timer hits zero or all questions have been answered, run this function
    clearInterval(timeInt); //stop time
    if (timeLeft >= 0) { //make sure time does not go negative
        timerEl.textContent = 'Time: ' + timeLeft;
    } else {
        timeLeft = 0;
        timerEl.textContent = 'Time: ' + timeLeft;
    }
    questionHead.textContent = 'All Done!';
    questionDiv.textContent = 'Your final score is ' + timeLeft;
    questionDiv.appendChild(scoreForm);
    document.addEventListener('submit', function(event) {
        event.preventDefault();
        localStorage.setItem(userScore.value, timeLeft);
        highScore();
    });
}

var highScore = function() {
    mainHead.remove(); //removes initial main heading
    mainP.remove(); //removes initial main paragraph
    startBtnEl.remove(); //removes start button

    pageContentEl.appendChild(questionHead);
    pageContentEl.appendChild(questionDiv);
    
    console.log('hit');
    questionHead.textContent = 'High Scores'
    questionDiv.textContent = ''
    var highScoreList = [];
    for (let i = 0; i < localStorage.length; i++) { //loop through high scores
        highScoreList.push(localStorage.getItem(localStorage.key(i)) + ' - ' + localStorage.key(i)); //get highscore key and value
        highScoreList.sort().reverse(); //sort highscores with highest on top
    }
    for (let i = 0; i < highScoreList.length; i++) { //loop to add highscores to screen
        var highScoreListItem = document.createElement('li') //turn highscore into list item
        highScoreListItem.textContent = highScoreList[i]; //add content to list item
        questionDiv.append(highScoreListItem); //add list items to ol
    }
    
    questionDiv.appendChild(goBackBtn);
    questionDiv.appendChild(clearScoreBtn);
    
    goBackBtn.addEventListener('click', goBack); 
    clearScoreBtn.addEventListener('click', clearScore);
}

var goBack = function() {
    window.location.reload();
}

var clearScore = function() {
    localStorage.clear();
    alert('The high scores have been cleared');
    window.location.reload();
}

startBtnEl.addEventListener('click', startGame); //listens for click on start button, then calls function
highscoreBtnEl.addEventListener('click', highScore);