var startBtnEl = document.querySelector('#startBtn'); //sets var for start button
var questionHead = document.querySelector('#main-head'); //sets var for main h1 element
var pageContentEl = document.querySelector('.page-content');

var startGame = function() {
    console.log('hit'); //for testing only

    var questionOl = document.createElement('ol'); //create ordered list element
    questionOl.className = 'question-list'
    pageContentEl.appendChild(questionOl);
}

function createQuestion() {    

    
}

startBtnEl.addEventListener('click', startGame); //listens for click on start button, then calls function