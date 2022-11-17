
const board = document.getElementsByClassName("win");
const reset = document.getElementById("reset");
const currPlayer = document.getElementById("currentPlayer");
const numberOfMoves = document.getElementById("moves");
const info = document.getElementById("info");
const close = document.getElementsByClassName("xmark")[0];
const gameEndBoard = document.getElementsByClassName("winner")[0];
const gameEndBoardWinner = document.getElementById("winner");
const wrapper = document.getElementsByClassName("wrapper")[0];
const winsCounter = document.getElementsByClassName("winstreak");
const playerSet = document.getElementsByClassName("player-container")[0];
const settings = document.getElementById("settings");
const submitPlayers = document.getElementById("submitPlayers");
const customPlayerNames = document.getElementsByName("customPlayer");
const title = document.getElementById("title");


// * GLOBAL VARIABLES
let gameField = [];
let moves = 0;
let player = 'X';
let gameState = 'not';
let symbol;
let numWinsX = 0;
let numWins0 = 0;
let customPlayer =  ["X", "0"];
let playerWon;
let tieCounter = 0;
const strings = ["Current player: ", "Number of moves: ", "Player Won: "];
let pastMoves = [[],[]];

// * Game info
currPlayer.innerHTML = strings[0] +  customPlayer[0] + "(" + player + ")";
numberOfMoves.innerHTML = strings[1] + moves;
info.innerHTML = "Ties: 0";
winsCounter[0].innerHTML = customPlayer[0] + "(x) wins: " + numWinsX;
winsCounter[1].innerHTML = customPlayer[1] + "(0) wins: " + numWins0;

// * Opens custom player menu
settings.onclick = () => {
    playerSet.style.display = 'flex';
    setTimeout(function() {
        playerSet.style.transform = 'translateX(0px)'  
    }, 10)
        wrapper.style.filter = 'blur(5px)';
}

// * Resets the field
reset.onclick = () => {
    resetGame();
}
// * Closes End Screen
close.onclick = () => {
    gameEndBoard.style.transform = 'translateX(-800px)';
    setTimeout(function() {
        gameEndBoard.style.display = 'none'
    }, 50);
    wrapper.style.filter = 'none';
    
}
// * Handles custom player names
submitPlayers.onclick =  () => {
    customPlayer[0] = customPlayerNames[0].value;
    customPlayer[1] = customPlayerNames[1].value;
    playerSet.style.transform = 'translateX(-800px)';
    setTimeout(function() {
        playerSet.style.display = 'none'
    }, 50);
    wrapper.style.filter = 'none';
    winsCounter[0].innerHTML = customPlayer[0] + "(x) wins: " + numWinsX;
    winsCounter[1].innerHTML = customPlayer[1] + "(0) wins: " + numWins0;
    currPlayer.innerHTML = strings[0] +  customPlayer[0];
}
// * Resets game
function resetGame() 
    {
        Array.from(board).forEach((element, index) => {
            element.innerHTML = "";
            // gameField[index] = null;
        })
        player = 'X';
        moves = 0;
        tieCounter = 0;
        gameField = [];
        currPlayer.innerHTML = strings[0] + player;
        numberOfMoves.innerHTML = strings[1] + moves;
        winsCounter[0].innerHTML = customPlayer[0] + "(x) wins: " + numWinsX;
        winsCounter[1].innerHTML = customPlayer[1] + "(0) wins: " + numWins0;
        info.innerHTML = "Ties: " + tieCounter;
         
    }
//* Game end screen shows winner
function gameEndScreen (playerWon) {
    if (player !== 'X') {
        numWinsX++;
    } else {
        numWins0++;
    }
    
    gameEndBoard.style.display = 'flex';
    setTimeout(function() {
      gameEndBoard.style.transform = 'translateX(0px)'  
    }, 10)
    wrapper.style.filter = 'blur(5px)';
    if (playerWon === "Tie") {
        title.innerHTML = playerWon;
        title.style.fontSize = '2rem';
        gameEndBoardWinner.innerHTML = "";
        tieCounter++;
        info.innerHTML = "Tie`s: " + tieCounter;
    } else {
        title.innerHTML = "Congratulations!"
        if (playerWon === "X") {
            gameEndBoardWinner.innerHTML = 'Player ' + customPlayer[0] + ' Won'; 
        } else {
            gameEndBoardWinner.innerHTML = 'Player ' + customPlayer[1] + ' Won'; 
        }
        
    }
    
    winsCounter[0].innerHTML = customPlayer[0] + "(x) wins: " + numWinsX;
    winsCounter[1].innerHTML = customPlayer[1] + "(0) wins: " + numWins0;
    resetGame();
}
// * Calculates the winner
function calculateWinner (){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
    let symbol;
    let isTie = true;
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (gameField[a] === gameField[b] && gameField[b] === gameField[c]) {
                symbol = gameField[a];
                return(symbol);
            }
        }
        return "Tie";


}
// * Switches player
function switchPlayer () {
    if (player === 'X'){
        player = 'O';
        currPlayer.innerHTML = strings[0] + player;
    }   else{
        player = 'X';
        currPlayer.innerHTML = strings[0] + player;
    }   
}

// * Event handler for the game
Array.from(board).forEach((element, index) => {
    element.onclick = () => {
        if (element.innerHTML === "") {
            element.innerHTML = player;
            gameField[index] = player;
            switchPlayer();
            // pastMoves[moves][moves] = gameField[moves];
            // console.table(pastMoves);
            moves++;
            numberOfMoves.innerHTML = strings[1] + moves;
            if (moves >= 5){
                playerWon = calculateWinner()
                if (playerWon !== undefined){
                    if (playerWon === "Tie") {
                            if (moves === 9) {
                                gameEndScreen(playerWon);
                            }
                        } else {
                            gameEndScreen(playerWon);
                        }
                }
            }
            
        }
    }
})
