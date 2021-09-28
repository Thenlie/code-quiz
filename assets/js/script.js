var startBtnEl = document.querySelector('#startBtn'); //sets var for start button
var mainHead = document.querySelector('#main-head'); //sets var for main h1 element
var mainP = document.querySelector('#main-p'); //sets var for main paragraph element
var timerEl = document.querySelector('#timer'); //set var for timer element
var pageContentEl = document.querySelector('.page-content');

var questionCount = 0; //counts how many questions have been asked
var questionNum = {}; //empty object to pass questions through

//var btnPressed = '';

//create question objects
var questionOne = {question: 'Commonly used data types do NOT include:', answerOne: 'Strings', answerTwo: 'Booleans', answerThree: 'Alerts', answerFour: 'Numbers', solution: 'question-btn-three'};

var questionTwo = {question: 'The condition in an if/else statement is enclosed with:', answerOne: 'Quotes', answerTwo: 'Curly Brackets', answerThree: 'Parenthesis', answerFour: 'Square Brackets', solution: 'question-btn-two'};

var questionThree = {question: 'A useful tool used during debugging to print content to the debugger is:', answerOne: 'JavaScript', answerTwo: 'For Loops', answerThree: 'Terminal/Bash', answerFour: 'console.log', solution: 'question-btn-four'};

var questionFour = {question: 'Arrays can be used to store:', answerOne: 'Numbers and Strings', answerTwo: 'Other Arrays', answerThree: 'Booleans', answerFour: 'All of the Above', solution: 'question-btn-four'};

var questionFive = {question: 'String values must be enclosed within ___ when being assigned to variables.', answerOne: 'Quotes', answerTwo: 'Curly Brackets', answerThree: 'Parenthesis', answerFour: 'Square Brackets', solution: 'question-btn-one'};

//create question HTML elements
var questionHead = document.createElement('h1'); //create h1 element
questionHead.className = 'question-head';
var questionOl = document.createElement('ol'); //create ordered list element
questionOl.className = 'question-list'
var questionBtnOne = document.createElement('button'); //create button element
questionBtnOne.className = 'question-btn-one'
var questionBtnTwo = document.createElement('button'); //create button element
questionBtnTwo.className = 'question-btn-two'
var questionBtnThree = document.createElement('button'); //create button element
questionBtnThree.className = 'question-btn-three'
var questionBtnFour = document.createElement('button'); //create button element
questionBtnFour.className = 'question-btn-four'

var startGame = function() {
    console.log('hit'); //for testing only
    var timeLeft = 75; //set timer to 75
    timerEl.textContent = 'Time: ' + timeLeft;

    mainHead.remove(); //removes initial main heading
    mainP.remove(); //removes initial main paragraph
    startBtnEl.remove(); //removes start button



    createQuestion();

    var timeInt = setInterval(function() {
        if (timeLeft > 0) {
            timerEl.textContent = 'Time: ' + timeLeft; //write timeLeft to the timer element
            timeLeft--; //decrement timer every interval
        } else {
            timerEl.textContent = ''; //remove timer from screen
            clearInterval(timeInt); //clear timer
            stopGame(); 
        }
    }, 1000);
}

var createQuestion = function() { //generates a question from the list
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

    // var questionHead = document.createElement('h1'); //create h1 element
    // questionHead.className = 'question-head';
    questionHead.textContent = questionNum.question;
    pageContentEl.appendChild(questionHead); //add h1 to page

    // var questionOl = document.createElement('ol'); //create ordered list element
    // questionOl.className = 'question-list'
    pageContentEl.appendChild(questionOl); //add ol to page

    // var questionBtnOne = document.createElement('button'); //create button element
    // questionBtnOne.className = 'question-button-one'
    questionBtnOne.textContent = questionNum.answerOne;
    questionOl.appendChild(questionBtnOne); //add li to ol

    // var questionBtnTwo = document.createElement('button'); //create button element
    // questionBtnTwo.className = 'question-button-two'
    questionBtnTwo.textContent = questionNum.answerTwo;
    questionOl.appendChild(questionBtnTwo); //add li to ol

    // var questionBtnThree = document.createElement('button'); //create button element
    // questionBtnThree.className = 'question-button-three'
    questionBtnThree.textContent = questionNum.answerThree;
    questionOl.appendChild(questionBtnThree); //add li to ol

    // var questionBtnFour = document.createElement('button'); //create button element
    // questionBtnFour.className = 'question-button-four'
    questionBtnFour.textContent = questionNum.answerFour;
    questionOl.appendChild(questionBtnFour); //add li to ol

    var questionBtnEl = document.querySelector('.question-list');
    questionBtnEl.addEventListener('click', newQuestion); //listens for click on the question buttons
}

var newQuestion = function(event) {
    var btnPressed = event.target; //define btnPressed as whichever button was clicked
    if (btnPressed.className == questionNum.solution) { //check if the button is the same as the solution
        alert('Nice');
    } else {
        alert('Not Nice');
    }
    
    createQuestion();
}

function stopGame() {     //once the timer hits zero, run this function
    console.log('The game has ended!');
    
}

startBtnEl.addEventListener('click', startGame); //listens for click on start button, then calls function

