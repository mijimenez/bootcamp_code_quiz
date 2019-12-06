// ----- Variables
var timer = document.querySelector("#timer");
var startBtn = document.querySelector("#startBtn");
var introContainer = document.querySelector("#introContainer");
var quizContainer = document.querySelector("#quizContainer");
var quizQuestion = document.querySelector("#question");
var optionsContainer = document.querySelector("#options");
var results = document.querySelector("#results");
var correctAudio = document.querySelector("#correctAudio");
var incorrectAudio = document.querySelector("#incorrectAudio");
var scoreContainer = document.querySelector("#finalScoreContainer");
var finalScore = document.querySelector("#finalScore");
var highScores = getHighScores();

var seconds = 75;
var interval;
var questionNumber = 0;



// ----- Functions
//Start timer once "Start Quiz" CTA is clicked and displays to the DOM.
function startTimer() {
    timer.textContent = seconds;

    introContainer.setAttribute("style", "display: none;")
    quizContainer.setAttribute("style", "display: block;")

    displayQuestions(questionNumber);
  
    interval = setInterval(function() {
      seconds--;
      renderTimer();
    }, 1000);
    
}

// If seconds is under 10, add a second 0 digit. If seconds get to 10, turn red for alerting user. If seconds get to 0 or negative, stop timer.
function renderTimer() {
    // HELP: This adds an additional zero to the displayed timer after the interval has been cleared. How do I make this only add an additional zero if the seconds are under 10 AND if the timer is not stopped.
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

// Get scores from local storage.
function getHighScores() {
    var storedHighScores = JSON.parse(localStorage.getItem("highScores"));

    if (storedHighScores === null) {
        highScores = [];
    }
    else {
        highScores = storedHighScores;
    }

    return(storedHighScores);
  }

// Shuffle through questions and populate multiple choices. After the last question. Display the final score.
function displayQuestions(j) {
    if (j === questions.length) {
        setTimeout(displayFinalScore, 2000);
        clearInterval(interval);
        return;
    }
    quizQuestion.textContent = questions[j].question;
    for (var i = 0; i < questions[j].choices.length; i++) {
        optionsContainer.children[i].value = questions[j].choices[i];
    }
}

// Remove quiz content and display final score with user input for initials.
function displayFinalScore() {
    quizContainer.setAttribute("style", "display: none;")
    scoreContainer.setAttribute("style", "display: block;")
    finalScore.textContent = seconds;
    clearInterval(interval);
    // renderTimer();
}

// Target multiple choice clicked and check value against correct answer value. If correct, send good message and sound. If incorrect, send bad message, sound and deduct 10 seconds.
function userChoice(event) {
    var userInput = event.target.value;

    var resultsMessage = document.createElement("p");
    results.appendChild(resultsMessage);
    resultsMessage.setAttribute("style", "border-top: thin solid grey; margin-top: 1em; padding-top: 1em;")

    // console.log("Chosen: " + userInput);
    // console.log("Correct answer is: " + questions[questionNumber].correctAnswer);
    // console.log("---------");
    
    if (userInput === questions[questionNumber].correctAnswer) {
        // console.log("Correct!");
        correctAudio.play(); 
        resultsMessage.textContent = "Correct!";
        results.setAttribute("style", "color: green;")
    }
    else {
        // console.log("Incorrect...");
        incorrectAudio.play(); 
        resultsMessage.textContent = "Incorrect! -10 sec.";
        results.setAttribute("style", "color: red;")

        if (seconds >= 10) {
            seconds = seconds - 10;
        }
        else {
            clearInterval(interval);
            seconds = 0;
            renderTimer();
        }
    }
    
    // Remove results messages at .7 seconds.
    function removeResultsMessage(){
        results.removeChild(resultsMessage);
    }

    setTimeout(removeResultsMessage, 700);

    // Display next question.
    questionNumber++;

    displayQuestions(questionNumber);
}

// Submit initals and final score once submit button is clicked.
function submitInitials(event) {

    event.preventDefault();

    var initialsInputText = initialsInput.value.trim();

    if (initialsInputText === "") {
        return;
    }
 
    // HELP: Cannot read property 'push' of null at HTMLButtonElement.submitInitials 
    // Research: javascript loads before the HTML elements??
    var str = initialsInputText + " - " + seconds;
    // console.log(highScores);
    highScores = [];
    highScores.push(str);
    initialsInput.value = "";

    storeHighScores();

    // After initials w/ score is submitted, redirect to the scoreboard.
    window.location.href = "scoreboard.html";
  };

  // Store scores to local storage.
  function storeHighScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }



// ----- Event Listeners
startBtn.addEventListener("click", startTimer);
optionsContainer.addEventListener("click", userChoice);
initialsSubmit.addEventListener("click", submitInitials);

