/*
author: Bailey L. last updated: 2024-07-28
  ____
 /\' .\     _____
/: \___\   / .  /\
\' / . /  /____/..\   DICE GAME
 \/___/   \'  '\  /
           \'__'\/
*/

/*VARIABLES & CONSTANTS*/

//DOM elements
const splash = document.getElementById("splash"); //splash image before game
const playerDiceArea = document.getElementById("player-dice-area"); //div where player's dice are
const pDice1 = document.getElementById("pDice1"); //display player's first die
const pDice2 = document.getElementById("pDice2"); //display player's second die
const computerDiceArea = document.getElementById("computer-dice-area"); //div where player's dice are
const cDice1 = document.getElementById("cDice1"); //display computer's first die
const cDice2 = document.getElementById("cDice2"); //display computer's second die
const info = document.getElementById("info"); //display information to the user
//stats
const playerTotal = document.getElementById("player-total"); //display player's score for the current round
const computerTotal = document.getElementById("computer-total"); //display computer's score for the current round
const playerScore = document.getElementById("player-score"); //display player's rounds won (x/3)
const computerScore = document.getElementById("computer-score"); //display computer's rounds won (x/3)
const playerWins = document.getElementById("player-wins"); //display number of times player has won
const computerWins = document.getElementById("computer-wins"); //display number of times computer has won
const totalWins = document.getElementById("total-wins"); //display total number of games played
//buttons
const roll = document.getElementById("roll"); //roll dice button
const start = document.getElementById("start"); //start game button
const music = document.getElementById("music"); //music/mute button for background music
const close = document.getElementById("close"); //button removes rules from sidebar
//sound
const bgm = document.getElementById("bgm"); //the audio player for the background music
const sfxStart = new Audio("../sounds/start.wav");
const sfxRoll = new Audio("../sounds/dropping.wav");
const sfxWin = new Audio("../sounds/win.wav");
const sfxLose = new Audio("../sounds/lose.wav");
const sfxTie = new Audio("../sounds/tie.wav");
//image files
const point = "<img src='../images/smile.png'>"; //inserted html image to represent one point
//game varibles
const diceFaces = 6;
//other
let timeoutHandler;
let isPlayingMusic = false;

/*GAME*/

//player object
class Player {
    constructor() {
        this.dice1 = 0;
        this.dice2 = 0;
        this.currentScore = 0;
        this.roundsWon = 0;
        this.totalWins = 0;
    }

    rollDice() {
        this.dice1 = Math.floor(Math.random() * diceFaces) + 1;
        this.dice2 = Math.floor(Math.random() * diceFaces) + 1;
        if (this.dice1 == 1 || this.dice2 == 1) {
            this.currentScore = 0;
        }
        else if (this.dice1 == this.dice2) {
            this.currentScore = this.dice1 * 4;
        }
        else {
            this.currentScore = this.dice1 + this.dice2;
        }
    }
}

//music button
music.addEventListener("click", function () {
    if (!isPlayingMusic) {
        bgm.play();
        music.innerHTML = "MUTE";
        isPlayingMusic = true;
    }
    else {
        bgm.pause();
        music.innerHTML = "MUSIC";
        isPlayingMusic = false;
    }
});

const user = new Player();
const computer = new Player();

//start button
start.addEventListener("click", function () {
    //reset game displays from last round
    playerScore.innerHTML = "";
    computerScore.innerHTML = "";
    playerTotal.innerHTML = "";
    computerTotal.innerHTML = "";
    info.innerHTML = "Let's Roll!";
    //set-up game
    splash.classList.add("hide");
    sfxStart.play();
    playerDiceArea.classList.remove("hide");
    computerDiceArea.classList.remove("hide");
    start.setAttribute("disabled", true);
    start.innerHTML = "Replay";
    roll.removeAttribute("disabled");
});

//roll button
roll.addEventListener("click", function () {
    roll.setAttribute("disabled", true);
    sfxRoll.play();
    user.rollDice();
    computer.rollDice();
    //timeout to let rolling dice sfx play and avoid spam clicking
    timeoutHandler = setTimeout(function () {
        pDice1.src = `../images/dice/${user.dice1}_dots.png`;
        pDice2.src = `../images/dice/${user.dice2}_dots.png`;
        cDice1.src = `../images/dice/${computer.dice1}_dots.png`;
        cDice2.src = `../images/dice/${computer.dice2}_dots.png`;
        playerTotal.innerHTML = user.currentScore;
        computerTotal.innerHTML = computer.currentScore;
        if (user.currentScore > computer.currentScore) {
            //player wins
            sfxWin.play();
            user.roundsWon++;
            info.innerHTML = "Win!";
            playerScore.innerHTML += point;
        }
        else if (user.currentScore == computer.currentScore) {
            //tie
            sfxTie.play();
            info.innerHTML = "Tie...";
        }
        else {
            //player loses
            sfxLose.play();
            computer.roundsWon++;
            info.innerHTML = "Lose.";
            computerScore.innerHTML += point;
        }
        roll.removeAttribute("disabled");
        if (user.roundsWon >= 3 || computer.roundsWon >= 3) {
            if (user.roundsWon >= 3) {
                user.totalWins++;
                info.innerHTML = "Player Wins.";
            }
            else {
                computer.totalWins++;
                info.innerHTML = "Computer Wins."
            }
            //reset
            user.roundsWon = 0;
            computer.roundsWon = 0;
            roll.setAttribute("disabled", true);
            start.removeAttribute("disabled");
            //update stats
            playerWins.innerHTML = user.totalWins;
            computerWins.innerHTML = computer.totalWins;
            totalWins.innerHTML = user.totalWins + computer.totalWins;
        }
    }, 1000);
});

//close button
close.addEventListener("click", function(){
    document.getElementById("rules").removeAttribute("id");
    close.style.display = "none";
});