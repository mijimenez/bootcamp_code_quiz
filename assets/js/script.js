// Variables
var questions = [
      {
        question: "1/5: Commonly used data types DO NOT include:",
        choices: [
          "strings",
          "booleans",
          "alerts",
          "numbers"
        ],
        correctAnswer: "alerts"
      },
      {
        question: "2/5: The condition in an if/else statement is enclosed within _____.",
        choices: [
          "quotes",
          "curly brackets",
          "parentheses",
          "square brackets"
        ],
        correctAnswer: "parentheses"
      },
      {
        question: "3/5: Arrays in JavaScript can be used to store _____.",
        choices: [
          "numbers and strings",
          "other arrays",
          "booleans",
          "all of the above"
        ],
        correctAnswer: "all of the above"
      },
      {
        question: "4/5: String values must be enclosed within _____ when being assigned to variables.",
        choices: [
          "commas",
          "curly brackets",
          "quotes",
          "parentheses"
        ],
        correctAnswer: "quotes"
      },
      {
        question: "5/5: A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: [
          "JavaScript",
          "terminal/bash",
          "for loops",
          "console log"
        ],
        correctAnswer: "console log"
      }
    ]

var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#startBtn");
var introContainer = document.querySelector("#introContainer");
var quizContainer = document.querySelector("#quizContainer");
var quizQuestion = document.querySelector("#question");
var optionsContainer = document.querySelector("#options");
var results = document.querySelector("#results");
var scoreContainer = document.querySelector("#finalScoreContainer");
var finalScore = document.querySelector("#finalScore");
// Variables on scorboard page
var highScoresList = document.querySelector("#highScoresList");
var initialsForm = document.querySelector("#initialsForm");
var initialsInput = document.querySelector("#initialsInput");

var highScores = [];

var seconds = 60;
var interval;
var questionNumber = 0;



// Functions
function renderHighScores() {
    // highScoresList.innerHTML = "";

    for (var k = 0; k < highScores.length; k++) {
        var highScoreItem = highScores[k];

        var li = document.createElement("li");
        li.textContent = highScoreItem;
        li.setAttribute("data-index", k);

        highScoresList.appendChild(li);
    }
}


function init() {
    var storedHighScores = JSON.parse(localStorage.getItem("highScores"));

    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }
 
    renderHighScores();
  }
  
  function storeHighScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }



initialsForm.addEventListener("submit", function(event) {
    event.preventDefault();

    var initialsInputText = initialsInput.value.trim();

    if (initialsInputText === "") {
        return;
    }

    highScores.push(initialsInputText);
    initialsInput.value = "";

    storeHighScores()
    renderHighScores();
});




function startTimer() {
    timer.textContent = seconds;
  
    interval = setInterval(function() {
      seconds--;
      renderTimer();
    }, 1000);
    
}

function renderTimer() {
    if (seconds < 10) {
        seconds = "0" + seconds.toString();
    }

    if (seconds <= 10) {
        timer.setAttribute("style", "color: red;");
    }

    if (seconds <= 0) {
        clearInterval(interval);
    }

    timer.textContent = seconds;
}


function redirectScoreBoard(){
    alert("Your time was: " + seconds + ". Redirecting to score board!");
    window.location.href = "scoreboard.html";
}

function startQuestions() {
    introContainer.setAttribute("style", "display: none;")
    quizContainer.setAttribute("style", "display: block;")

    displayQuestions(questionNumber);
}

function displayQuestions(j) {
    // for (var i = 0; i < questions.length; i++) {
    //     console.log(questions[i]);
    // }
    quizQuestion.textContent = questions[j].question;
    optionsContainer.children[0].value = questions[j].choices[0];
    optionsContainer.children[1].value = questions[j].choices[1];
    optionsContainer.children[2].value = questions[j].choices[2];
    optionsContainer.children[3].value = questions[j].choices[3];
}

function displayFinalScore() {
    quizContainer.setAttribute("style", "display: none;")
    scoreContainer.setAttribute("style", "display: block;")
    finalScore.textContent = seconds;
    clearInterval(interval);
}

function userChoice(event) {
    var userInput = event.target.value;

    var resultsMessage = document.createElement("p");
    results.appendChild(resultsMessage);
    resultsMessage.setAttribute("style", "border-top: thin solid grey; margin-top: 1em; padding-top: 1em;")

    console.log("Chosen: " + userInput);
    console.log("Correct answer is: " + questions[questionNumber].correctAnswer);
    console.log("---------");
    
    if (userInput === questions[questionNumber].correctAnswer) {
        console.log("Correct!");
        resultsMessage.textContent = "Correct!";
        results.setAttribute("style", "color: green;")
    }
    else {
        console.log("Incorrect...");
        resultsMessage.textContent = "Incorrect! -10 sec.";
        results.setAttribute("style", "color: red;")

        if (seconds >= 10) {
            seconds = seconds - 10;
        }
        else {
            seconds = 1;
        }
    }
    function removeResultsMessage(){
        results.removeChild(resultsMessage);
    }

    setTimeout(removeResultsMessage, 1000);

    questionNumber++;

    displayQuestions(questionNumber);
    
    if (questionNumber === 4) {
        // setTimeout(redirectScoreBoard, 1000);
        setTimeout(displayFinalScore, 3000);  
    }
}




// Event Listeners
startBtn.addEventListener("click", startTimer);
startBtn.addEventListener("click", startQuestions);
optionsContainer.addEventListener("click", userChoice);
