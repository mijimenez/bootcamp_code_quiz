# Code Quiz

## Screenshot of Application

![Desktop](./assets/img/code-quiz-screenshot.png)

## Live Link
- Launch the application [here](https://mijimenez.github.io/bootcamp_code_quiz/)

## Technologies Used
- HTML5
- Bootstrap
- CSS3
- JavaScript

## Play Proceeds as Follows
As a coding bootcamp student, I want to take a timed quiz on JavaScript fundamentals that stores high scores so that I can gauge my progress compared to my peers.

## Play Proceeds as Follows
The user arrives at the landing page and is presented with a call-to-action to "Start Quiz." Also note the navigation option to "View Highscores" and the "Time" value set at 0.

Clicking the "Start Quiz" button presents the user with a series of questions. The timer is initialized with a value and immediately begins countdown.

Score is calculated by time remaining. Answering quickly and correctly results in a higher score. Answering incorrectly results in a time penalty (10 seconds are subtracted from time remaining).

When time runs out and/or all questions are answered, the user is presented with their final score and asked to enter their initials. Their final score and initials are then stored in `localStorage`.

- - -
© 2019 [Madeline Jimenez](https://github.com/mijimenez)