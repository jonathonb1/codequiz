// Variables to keep track of the current state of quiz
var time = questions.length * 15;
var timerId;
var currentQuestionIndex = 0;

// DOM variables
var timerEl = document.getElementById("time");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");

function startQuiz() {
    // hiding quiz-start screen
    var startScreenEl = getElementById("start=screen");
    startScreenEl.setAttribute("class", "hide");

    //start timer
    timerID = setInterval(countDown, 1000);
    

    // show start time
    timerEl.textContent = time;

    getQuestions();
}

function getQuestion(); {
// get question objects from array
var currentQuestion = questions [currentQuestionIndex];


var titleEl = document.getElementById("question-title");
titleEl.textContent = currentQuestion.title;

// clear old choices
choicesEl.innterHTML = "";

// loop choices
currentQuestion.choices.forEach(function(choice, i) {
    var choiceNoce = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    choiceNode.onclick = questionClick;

    choiceEl.appendChild(choiceNode);
});

// check answers to questions upon click
function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time-= 15;
    }

    if (time < 0) {
        time = 0;
    }

// update time
    timeEl.textContent = time;

    feedbackEl.textContent = "Incorrect"; 

    } else {

        feedbackEl.textContent = "Correct"
    }

}

function countDown() {
    time--;
    timerEl.textContent = time;

}


}