/*author: Bailey L. last updated: 2024-07-24*/

/*Create a dice game where a user plays against the computer. The user and the computer each 
roll a pair of dice 3 times. After the third roll of the dice the player with highest score wins. 
The scoring for the game works as follows: 
- If any of the players two dice comes up as a 1 then the score for that round for the player 
is 0. eg: if the player rolls a 6 and 1, they get a score of 0 
- If the player rolls a pair of the same numbers then the players score is the total of the 
two dice times 2. eg: if he player rolls 5 and 5, they get a score of (5+5)*2=20 
- If the player rolls any other combination of dice other than the ones mentioned above 
then the players score is the total value of the two dice, eg: player rolls a 3 and 2, player 
gets a score of 3+2=5 
The game should provide a text or graphical output showing the following: 
- The current rolled dice values for the player and the computer. 
- The score for this round for the player and the computer. 
- The accumulated total score for the player and computer 
The game should provide a button that will do the following: roll a pair dice for the player and 
another pair of dice for the computer, calculate the score for each of the player’s then update 
the browser display to reflect the state of the game. 
After three rolls of the dice the game should total up the scores and display a message 
displaying who the winner was.  
The game should provide a button that will reset the game and start a new game */

//game logic
const diceFaces = 6;
class Player {
    constructor(name) {
        this.name = name;
        this.dice1 = 0;
        this.dice2 = 0;
        this.currentScore = 0;
        this.totalScore = 0;
        this.numberWon = 0;
        this.totalPlayed = 0;
    }
    //functions
    rollDice() {
        this.dice1 = Math.floor(Math.random() * diceFaces) + 1;
        this.dice2 = Math.floor(Math.random() * diceFaces) + 1;
        if (this.dice1 == this.dice2) {
            this.currentScore = this.dice1 * 4;
        }
        else if (this.dice1 == 1 || this.dice2 == 1) {
            this.currentScore = 0;
        }
        else {
            this.currentScore = this.dice1 + this.dice2;
        }
    }
}

function compareScores(playerScore, computerScore) {
    if (playerScore > computerScore) {
        return "win";
    }
    if (playerScore == computerScore) {
        return "tie";
    }
    else {
        return "lose";
    }
}

const user = new Player("Username");
const computer = new Player("Computer");
user.rollDice();
computer.rollDice();
console.log(user.dice1, user.dice2, user.currentScore);
console.log(computer.dice1, computer.dice2, computer.currentScore);

//sounds
const sfxRoll = new Audio("../sounds/rolling-and-dropping.wav");
const sfxWin = new Audio("../sounds/win.wav");
const sfxLose = new Audio("../sounds/lose.wav");
const sfxStart = new Audio("../sounds/start.wav");
const sfxTie = new Audio("../sounds/tie.wav");

/* const roll = document.getElementById("roll");
roll.addEventListener("click", function(){
    sfxStart.play();
}); */

//bgm
const bgm = document.getElementById("bgm");
const music = document.getElementById("music");
let isPlaying = false;

music.addEventListener("click", function () {
    if (!isPlaying) {
        bgm.play();
        music.innerHTML = "MUTE";
        isPlaying = true;
    }
    else {
        bgm.pause();
        music.innerHTML = "MUSIC";
        isPlaying = false;
    }
});

//game

const splash = document.getElementById("splash");
const playerDiceArea = document.getElementById("playerDiceArea");
const pDice1 = document.getElementById("pDice1");
const pDice2 = document.getElementById("pDice2");
const computerDiceArea = document.getElementById("computerDiceArea");
const cDice1 = document.getElementById("cDice1");
const cDice2 = document.getElementById("cDice2");
const roll = document.getElementById("roll");

const start = document.getElementById("start");
start.addEventListener("click", function () {
    //set-up
    splash.classList.add("hide");
    sfxStart.play();
    playerDiceArea.classList.remove("hide");
    computerDiceArea.classList.remove("hide");
    start.setAttribute("disabled", true);
    start.innerHTML = "Replay";
    roll.removeAttribute("disabled");
});

const round = 1;
roll.addEventListener("click", function () {
    sfxRoll.play();
    user.rollDice();
    computer.rollDice();
    pDice1.src = `../images/dice/${user.dice1}_dots.png`;
    pDice2.src = `../images/dice/${user.dice2}_dots.png`;
    cDice1.src = `../images/dice/${computer.dice1}_dots.png`;
    cDice2.src = `../images/dice/${computer.dice2}_dots.png`;
    switch (compareScores(user.currentScore, computer.currentScore)) {
        case "win": sfxWin.play(); break;
        case "tie": sfxTie.play(); break;
        case "lose": sfxLose.play(); break;
        default: sfxTie.play(); break;
    }
});
