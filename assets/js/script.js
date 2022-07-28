// Variables to keep track of the current state of quiz
var time = questions.length * 15;
var timerId;

// DOM variables
var timerEl = document.getElementById("time");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");

function startQuiz() {
    // hiding quiz-start screen
    var startScreenEl = getElementById("start=screen");
    startScreenEl.setAttribute("class", "hide");

    //start timer
    timerID = setInterval(clockTick, 1000);
    

    // show start time
    timerEl.textContent = time;

    getQuestions();

}