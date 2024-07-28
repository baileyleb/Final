/*author: Bailey L. last updated: 2024-07-24*/

//game logic
const diceFaces = 6;
class Player {
    constructor(name) {
        this.name = name;
        this.dice1 = 0;
        this.dice2 = 0;
        this.score = 0;
        this.numberWon = 0;
        this.rounds = 0;
    }
    //functions
    rollDice() {
        this.dice1 = Math.floor(Math.random() * diceFaces) + 1;
        this.dice2 = Math.floor(Math.random() * diceFaces) + 1;
        if (this.dice1 == this.dice2) {
            this.score = this.dice1 * 4;
        }
        else if (this.dice1 == 1 || this.dice2 == 1) {
            this.score = 0;
        }
        else {
            this.score = this.dice1 + this.dice2;
        }
    }
}

function compareScores(playerScore, computerScore) {
    if (playerScore > computerScore) {
        return "win";
    }
    else if (playerScore == computerScore) {
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
console.log(user.dice1, user.dice2, user.score);
console.log(computer.dice1, computer.dice2, computer.score);

//sounds
const sfxRoll = new Audio("../sounds/dropping.wav");
const sfxWin = new Audio("../sounds/win.wav");
const sfxLose = new Audio("../sounds/lose.wav");
const sfxStart = new Audio("../sounds/start.wav");
const sfxTie = new Audio("../sounds/tie.wav");

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
const playerDiceArea = document.getElementById("player-dice-area");
const pDice1 = document.getElementById("pDice1");
const pDice2 = document.getElementById("pDice2");
const computerDiceArea = document.getElementById("computer-dice-area");
const cDice1 = document.getElementById("cDice1");
const cDice2 = document.getElementById("cDice2");
const roll = document.getElementById("roll");
const status = document.getElementById("status");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");
const point = "<img src='../images/smile.png'>";
const playerWins = document.getElementById("player-wins");
const computerWins = document.getElementById("computer-wins");
const totalWins = document.getElementById("total-wins");
const playerTotal = document.getElementById("player-total");
const computerTotal = document.getElementById("computer-total");

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
    playerScore.innerHTML = "";
    computerScore.innerHTML = "";
    playerTotal.innerHTML = "";
    computerTotal.innerHTML = "";
    status.innerHTML = "Let's Roll!";
});

let timeoutHandler;
roll.addEventListener("click", function () {
    sfxRoll.play();
    user.rollDice();
    computer.rollDice();
    roll.setAttribute("disabled", true);
    timeoutHandler = setTimeout(function () {
        pDice1.src = `../images/dice/${user.dice1}_dots.png`;
        pDice2.src = `../images/dice/${user.dice2}_dots.png`;
        cDice1.src = `../images/dice/${computer.dice1}_dots.png`;
        cDice2.src = `../images/dice/${computer.dice2}_dots.png`;
        playerTotal.innerHTML = user.score;
        computerTotal.innerHTML = computer.score;
        switch (compareScores(user.score, computer.score)) {
            case "win":
                sfxWin.play();
                user.numberWon++;
                status.innerHTML = "Win!";
                playerScore.innerHTML += point;
                break;
            case "tie":
                sfxTie.play();
                status.innerHTML = "Tie...";
                break;
            case "lose":
                sfxLose.play();
                computer.numberWon++;
                status.innerHTML = "Lose.";
                computerScore.innerHTML += point;
                break;
            default:
                sfxTie.play();
                status.innerHTML = "Error";
                break;
        }
        roll.removeAttribute("disabled");
        if (user.numberWon >= 3 || computer.numberWon >= 3) {
            if (user.numberWon >= 3) {
                //win
                user.rounds++;
                status.innerHTML = "Player Wins Round.";
            }
            else {
                //lose
                computer.rounds++;
                status.innerHTML = "Computer Wins Round."
            }
            //reset
            user.numberWon = 0;
            computer.numberWon = 0;
            roll.setAttribute("disabled", true);
            start.removeAttribute("disabled");
            //update stats
            playerWins.innerHTML = user.rounds;
            computerWins.innerHTML = computer.rounds;
            totalWins.innerHTML = user.rounds + computer.rounds;
        }
    }, 1000);
});
