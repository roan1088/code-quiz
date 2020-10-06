// DOM Elements
var startButton = document.getElementById("start-quiz");

var timer = document.getElementById("timer");

var containerEl = document.querySelector(".container");

// Function declarations
function startQuiz() {
    // Reset the timer
    var secondsLeft = 75;
    timer.innerText = secondsLeft;

    // Timer countdown
    var timerInterval = setInterval(function() {    
        secondsLeft--;
        timer.innerText = secondsLeft;

        if(secondsLeft === 0) {
          clearInterval(timerInterval);
          // Call endQuiz if timer runs out
          endQuiz();
        }

    }, 1000);

    // Remove the start button
    startButton.style.display = "none";

    // Create 4 new buttons
    // Empty array for the buttons
    var option = [];
    for (let i = 0; i < 4; i++) {
        // Create a button and add it to the document
        let newButton = document.createElement("button");
        newButton.classList.add("button"); 
        containerEl.appendChild(newButton);
        // Push the just created button to the end of the option array
        option.push(newButton);
        // Break line
        containerEl.appendChild(document.createElement("br"));
        console.log(option[i]);
    }
           
}

function endQuiz() {
    alert("End!");
}

startButton.addEventListener("click", startQuiz);