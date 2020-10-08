// DOM Elements
var highscoresListEl = document.getElementById("highscores-list");
var clearButton = document.getElementById("clear-highscores");

// Get highscores from local storage
var highscoresList = JSON.parse(localStorage.getItem("code-quiz-highscores"));
// console.log(highscoresList);

if (highscoresList) {
    // Sort the highscores from highest to lowest scores
    highscoresList.sort(function(a, b){return b.score - a.score}); // from https://www.w3schools.com/js/js_array_sort.asp
    
    highscoresList.forEach(function(highscore, index) {
        var liEl = document.createElement("li");
        liEl.innerText = highscore.initials + " - " + highscore.score;
        highscoresListEl.appendChild(liEl);
    });
}

// When clear highscores button is clicked
clearButton.addEventListener("click", function(event) {
    // Prevent default if any
    event.preventDefault();
    // Delete the highscores list from local storage
    localStorage.removeItem("code-quiz-highscores");
    // Delete the highscores on the screen
    highscoresListEl.innerHTML = "";
})