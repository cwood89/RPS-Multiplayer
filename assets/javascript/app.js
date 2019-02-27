// Initialize Firebase
var config = {
    apiKey: "AIzaSyBtq1Vdy_03eQ6H7HuusHxU1cMzwSHUWA4",
    authDomain: "bootcamp-homework-b6d8a.firebaseapp.com",
    databaseURL: "https://bootcamp-homework-b6d8a.firebaseio.com",
    projectId: "bootcamp-homework-b6d8a",
    storageBucket: "bootcamp-homework-b6d8a.appspot.com",
    messagingSenderId: "865911150402"
  };

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

// variables to store in database
var wins = 0;
var losses = 0;
var ties = 0;
var userGuess;
var opponentGuess;

// code to save data onto firebase
database.ref().set({
    wins: wins,
    losses: losses,
    ties: ties,
  });

// sets value of button to userGuess and pushes to database
$("button").on("click", function() {
    userGuess = $(this).val();
    database.ref().push({
        userGuess: userGuess,
    });
    console.log(userGuess);

});

// function to display results on DOM
function displayResults() {
    var winDisplay = $("<p>");
    var lossDisplay = $("<p>");
    var tieDisplay = $("<p>");
    winDisplay.text("Wins: " + wins);
    lossDisplay.text("Losses: " + losses)
    tieDisplay.text("Ties : " + ties);
    $("#results-display").append(winDisplay, lossDisplay, tieDisplay);
};


database.ref().on("value", function(snapshot) {
    wins = snapshot.val().wins;
    losses = snapshot.val().losses;
    ties = snapshot.val().ties;
});

 // determines the outcome of the game
 function checkWin() {
    if ((userGuess === "r") && (opponentGuess === "s")) {
        wins++;
    } else if ((userGuess === "r") && (opponentGuess === "p")) {
        losses++;
    } else if ((userGuess === "s") && (opponentGuess === "r")) {
        losses++;
    } else if ((userGuess === "s") && (opponentGuess === "p")) {
        wins++;
    } else if ((userGuess === "p") && (opponentGuess === "r")) {
        wins++;
    } else if ((userGuess === "p") && (opponentGuess === "s")) {
        losses++;
    } else if (userGuess === opponentGuess) {
        ties++;
    }
};
displayResults();