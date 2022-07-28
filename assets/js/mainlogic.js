// quiz status
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");


function startQuiz() {
  // hide start screen
  var startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");

  // un-hide questions section
  questionsEl.removeAttribute("class");

  // start timer
  timerId = setInterval(clockTick, 1000);

  // show starting time
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // get questions from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title quetions
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear old questions
  choicesEl.innerHTML = "";

  // loop choices
  currentQuestion.choices.forEach(function(choice, i) {
    // create new button for each choice
    var choicePrompt = document.createElement("button");
    choicePrompt.setAttribute("class", "choice");
    choicePrompt.setAttribute("value", choice);

    choicePrompt.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choicePrompt.onclick = questionClick;

    // display on the page
    choicesEl.appendChild(choicePrompt);
  });
}

function questionClick() {
  // if wrong answer
  if (this.value !== questions[currentQuestionIndex].answer) {
    // subtract 15 seconds from time
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    // display new time
    timerEl.textContent = time;


    feedbackEl.textContent = "Incorrect";
  } else {

    feedbackEl.textContent = "Correct";
  }

  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);

  // end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from local storage - if none, set empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score
    var newScore = {
      score: time,
      initials: initials
    };

    // saving to local storage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // back to main page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {

  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
