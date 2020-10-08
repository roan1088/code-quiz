// DOM Elements
var startButton = document.getElementById("start-quiz");
var timer = document.getElementById("timer");
var containerEl = document.querySelector(".container");
var questionEl = document.getElementById("question");
// Empty varaible for answer list element
var answerListEl;

// {question: "question?", options: ["option0", "option1", "option2", "option3"], answer: "0/1/2/3"}
var quizQuestions = [
    {question: "Commonly used data types DO NOT include:", options: ["strings", "booleans", "alerts", "numbers"], answer: "2"},
    {question: "The condition in an if/else statement is enclosed within ______.", options: ["quotes", "curly brackets", "parenthesis", "square brackets"], answer: "2"},
    {question: "Arrays in JavaScript can be used to store ______.", options: ["numbers and strings", "other arrays", "booleans", "all of the above"], answer: "3"},
    {question: "String values must be enclosed within ______ when being assigned to variables.", options: ["commas", "curly brackets", "quotes", "parenthesis"], answer: "2"},
    {question: "A very useful tool used during development and debugging for printing content to the debugger is:", options: ["JavaScript", "terminal/bash", "for loops", "console.log"], answer: "3"}
];
// console.log(quizQuestions);

// Function declarations
function startQuiz() {
    // Set the timer
    var secondsLeft = 75;
    timer.innerText = secondsLeft;

    // Timer countdown
    var timerInterval = setInterval(function() {    
        secondsLeft--;
        timer.innerText = secondsLeft;

        if(secondsLeft === 0) {
          clearInterval(timerInterval);
          // If timer runs out call endQuiz
          endQuiz(secondsLeft);
        }

    }, 1000);

    // Remove the start button
    startButton.remove();

    // Create a list for answers and add place it
    answerListEl = document.createElement("ul");
    // answerListEl.style.listStyle = "none";
    // answerListEl.style.padding = "0";
    answerListEl.classList.add("answer-list");
    containerEl.appendChild(answerListEl);

    // On click of a button inside answer list
    answerListEl.addEventListener("click", function(event) {
        var clickedElement = event.target;
        if (clickedElement.matches("button")) {
            // console.log("button clicked");
            var userChoice = clickedElement.getAttribute("option-value");
            // console.log(userChoice);   
            // Check if users choice matches the questions answer
            if (userChoice === quizQuestions[currentQuestion].answer) {
                // Correct
                // console.log("correct");
                displayResult("Correct");
            }
            else {
                // Wrong
                // console.log("wrong");
                displayResult("Wrong");
                // Reduce 10 seconds and display new time
                secondsLeft -= 10;
                timer.innerText = secondsLeft;
            }
            // Move to next question
            currentQuestion++;
            // If out of questions stop timer and call endQuiz
            if (currentQuestion === quizQuestions.length) {
                clearInterval(timerInterval);
                endQuiz(secondsLeft);
            }
            else {
                // Display the next question
                displayQuiz(currentQuestion);
            }
        }
    });

    // Start from first question
    var currentQuestion = 0;
    displayQuiz(currentQuestion);
}

function displayResult(result) {
    // Create a result display area
    var resultEl = document.createElement("p");
    resultEl.innerText = result;
    containerEl.appendChild(resultEl);    
    // Wait a while
    var resultInterval = setInterval( function () {
        // Remove the display
        resultEl.remove();
        clearInterval(resultInterval);
    }, 750);
}

function displayQuiz(questionIndex) {
    // Display question
    questionEl.innerText = quizQuestions[questionIndex].question;
    // Clear previous options if any
    answerListEl.innerHTML = "";
    // Display all options
    for (let i = 0; i < quizQuestions[questionIndex].options.length; i++) {
        // Create
        var liEl = document.createElement("li");
        var buttonEl = document.createElement("button");
        // Build
        buttonEl.setAttribute("option-value", i);
        buttonEl.classList.add("button");
        buttonEl.innerText = (i + 1) + ". " + quizQuestions[questionIndex].options[i];
        // Place
        liEl.appendChild(buttonEl);
        answerListEl.appendChild(liEl);
    }
}

function endQuiz(score) {
    // Remove all the buttons
    answerListEl.remove();
    // Display final score
    questionEl.innerText = "Your final score is " + score;
    
    // Ask for initals
    // Make a form
    var FormEl = document.createElement("form");
    containerEl.appendChild(FormEl);

    // Add input field and a submit button to the form
    var labelEl = document.createElement("label");
    labelEl.innerText = "Enter initials: ";
    FormEl.appendChild(labelEl);
    var inputEl = document.createElement("input");
    FormEl.appendChild(inputEl);
    var submitButton = document.createElement("button");
    submitButton.classList.add("button");
    submitButton.innerText = "Submit";
    FormEl.appendChild(submitButton);

    // When the form is submitted
    FormEl.addEventListener("submit", function(event) {
        // Prevent default submission
        event.preventDefault();
        // Get users initial
        var userInitial = inputEl.value;
        if (userInitial) {
            // Turn all info into an object
            var scoreObj = { initials: userInitial, score: score};
            // console.log(userInitial);

            // Store users initial to local storage   
            // Check old highscores     
            var highscoresList = JSON.parse(localStorage.getItem("code-quiz-highscores"));
            // console.log(highscoresList);
            if (highscoresList) {
                highscoresList.push(scoreObj);
            }
            else {
                highscoresList = [scoreObj];
            }      
            // console.log(highscoresList);
            localStorage.setItem("code-quiz-highscores", JSON.stringify(highscoresList));
            // Redirect to highscores page  
            location.href = "highscores.html";  
        }             
    });
}

// Code flow starts here
startButton.addEventListener("click", startQuiz);