// Variables
var questions = [
      {
        question: "Commonly used data types DO NOT include:",
        choices: [
          "strings",
          "booleans",
          "alerts",
          "numbers"
        ],
        correctAnswer: "alerts"
      },
      {
        question: "The condition in an if/else statement is enclosed within _____.",
        choices: [
          "quotes",
          "curly brackets",
          "parentheses",
          "square brackets"
        ],
        correctAnswer: "parentheses"
      },
      {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: [
          "numbers and strings",
          "other arrays",
          "booleans",
          "all of the above"
        ],
        correctAnswer: "all of the above"
      },
      {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choices: [
          "commas",
          "curly brackets",
          "quotes",
          "parentheses"
        ],
        correctAnswer: "quotes"
      },
      {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
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
var quizOption1 = document.querySelector("#option1");
var quizOption2 = document.querySelector("#option2");
var quizOption3 = document.querySelector("#option3");
var quizOption4 = document.querySelector("#option4");


var secondsLeft = 15;
var seconds;
var interval;
var input;


// Functions
function startTimer() {
    timer.textContent = secondsLeft;
  
    interval = setInterval(function() {
      secondsLeft--;
      renderTimer();
    }, 1000);
    
}

function renderTimer() {

    seconds = secondsLeft % 15;

    if (secondsLeft < 10) {
        secondsLeft = "0" + secondsLeft.toString();
    }

    if (secondsLeft <= 0) {
        clearInterval(interval);
    }

    timer.textContent = secondsLeft;
}

function startQuestions() {
    introContainer.setAttribute("style", "display: none;")
    quizContainer.setAttribute("style", "display: block;")

    displayQuestions();
}

function displayQuestions() {
    for (var i = 0; i < questions.length; i++) {
        console.log(questions[i]);
    }
    quizQuestion.textContent = questions[0].question;
    quizOption1.value = questions[0].choices[0];
    quizOption2.value = questions[0].choices[1];
    quizOption3.value = questions[0].choices[2];
    quizOption4.value = questions[0].choices[3];
}

function chooseOption() {
    input = //User's input choice ;

    console.log("Correct answer is: " + questions[0].correctAnswer);
    console.log("Chosen: " + input);

    if (input = questions[0].correctAnswer) {
        console.log("Correct!");
    }
    else {
        console.log("Incorrect!");
    }
}



// Event Listeners
startBtn.addEventListener("click", startTimer);
startBtn.addEventListener("click", startQuestions);
quizOption1.addEventListener("click", chooseOption);
quizOption2.addEventListener("click", chooseOption);
quizOption3.addEventListener("click", chooseOption);
quizOption4.addEventListener("click", chooseOption);



