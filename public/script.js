"use strict";

// Selecting the score elements and dice elements
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const winnerLabel0 = document.querySelector(".winnerLabel0");
const winnerLabel1 = document.querySelector(".winnerLabel1");

// Declare some variables which we will use later to make sure they are avaialble outide the init function below.  This does not require values or types to be assigned to the variables.  We use let to make sure these variables can be assigned and cooreced later
let scores, playing, currentScore, activePlayer;

// Add a function to initialize the page and set the initial conditions for the game
const init = function () {
  // Add an array to store player scores
  scores = [0, 0];

  // Add Boolean to control whether the game is being player or has ended
  playing = true;

  // Add variable to hold current score
  currentScore = 0;

  // Add variable to monitor active player.  Note that we define player one as player zero, to help later when we manipulate the scores array, which is of course indexed from zero due to the way JavaScript handles arrays
  activePlayer = 0;

  // Set the intial player scores to zero and display them
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  // Hide the dice
  diceEl.classList.add("hidden");

  // Remove any unwanted classes from the player elements.  Note that you can use .remove even when a class is not present.  If the class is not present on the element, JavaScript will just ignore the .remove method
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  // Set player one as the active player / remove player two from the active player
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");

  // Hide the winner label
  winnerLabel0.classList.add("hidden");
  winnerLabel1.classList.add("hidden");
};

// Run the initialization
init();

// Add a function for switching players.
const switchPlayer = function () {
  // Use a template literal to display the current score of the active player as zero
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  // Use a ternary operator to swap the active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // Swap the visuals based on the active user using the toggle method.  Toggle adds a class if it is missing, or removes it if it is present
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Add event listener to roll buttons
btnRoll.addEventListener("click", function () {
  // check the boolean variable playing, and if true, enable button clicks to carry out the play functions
  if (playing) {
    // 1. Generate a random roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);

    // Display the dice by altering the source of the dice image
    diceEl.classList.remove("hidden");
    diceEl.src = `../assets/dice-${dice}.png`;

    // 3. Check if one is rolled...
    //    If no, increase current player score
    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      //      If yes, switch player
    } else {
      switchPlayer();
    }
  }
});

// Add event listener to hold buttons
btnHold.addEventListener("click", function () {
  // check the boolean variable playing, and if true, enable button clicks to carry out the play functions
  if (playing) {
    // 1. Add current score to active player's score
    // Note that this is why we assin player one as player zero - so that we can refer to the zeroth element of the scores array
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2.  Check if players score is >= 20.  If yes, finish the game
    if (scores[activePlayer] >= 20) {
      // Set the playing function to false to stop the buttons being clickable
      playing = false;
      // Update the visuals to display the winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document
        .querySelector(`.winnerLabel${activePlayer}`)
        .classList.remove("hidden");
    } else {
      // 3.  If score is < 20, switch to next player
      switchPlayer();
    }
  }
});

// Add event listener to new game button which calls the initialization function
btnNew.addEventListener("click", init);

// Add modal button for instructions
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".show-instructions");

// Add a function for opening the instructions on click
const openModal = function () {
  // remove the 'hidden' class from the modal and overlay elements.  Note that 'hidden' does not have a dot - that is required when selecting an element, but not when removing a class
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

btnOpenModal.addEventListener("click", openModal);

// Add a function for closing the modal which can then be added to a number of different click or keypress events
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// close the modal when the modal 'cross' is clicked
btnCloseModal.addEventListener("click", closeModal);
// close the modal when the overlay is clicked
overlay.addEventListener("click", closeModal);

// close modal when the esc key is pressed
// this is done by listening to the entire document, not a specific element
// information about the keypress is collected by the eventListener method, and can be used to target specific keypresses (e.g. esc)
document.addEventListener("keydown", function (event) {
  // If key pressed is escape and modal does not contain the hidden class, close the modal
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
