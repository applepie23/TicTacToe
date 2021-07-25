let winnerAnnouncement = document.querySelector(".winnerAnnouncement");
let playersTurn = document.querySelector(".playersTurn");
let restart = document.querySelector(".restart");

let player = (name, turnOrder) => {
    let winner = false;
    let turnBol = false;
    if (turnOrder === 1){
        turnBol = true;
    }
    //player playedArray index becomes 1 if corresponding square is played
    let playedArray = [0,0,0,0,0,0,0,0,0];
    return { name, turnOrder, winner, turnBol, playedArray};
};

var gameBoard = (function () {
    var myModule = {};
    myModule.gameOver = false;
    myModule.turnArray = [0,0,0,0,0,0,0,0,0];
    myModule.count = 0;
    myModule.playerTurn = 1;
    myModule.gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    //creates player X and player O
    myModule.player1 = player("player1", 1);
    myModule.player2 = player("player2", 2);

    myModule.createBoard = function(array) {
        let gridContainer = document.createElement("div");
        gridContainer.classList.add("gridContainer");
        gridContainer.innerHTML = "";
        for (let i = 0; i < 9; i++){
            let gridElement = document.createElement("div");
            gridElement.id = i;
            gridElement.classList.add("gridElement");
            gridContainer.appendChild(gridElement);
        }
        document.body.appendChild(gridContainer);
    }

    myModule.isWinner = function(player) {
        let winner = false;
        let winCombinations = ["0,1,2", "3,4,5", "6,7,8", "0,3,6", "1,4,7", "2,5,8", "2,4,6", "0,4,8"];
        //loops through winCombinations and checks if player has won
        for (let i = 0; i < 8; i++) {
            let winCombo = winCombinations[i];
            let winComboArray = winCombo.split(",");
           
            let count = 0;
            for (let i = 0; i < 3; i++) {
                if (player.playedArray[winComboArray[i]] === 1){
                    count++;
                }
            }
            //if players has all three squares of a winning combo
            if (count === 3){
                winner = true;
            }
        }
        return winner;
    }

    myModule.createButtons = function() {
        //adds buttons to all 9 squares
        let zero = document.getElementById("0");
        zero.addEventListener('click', function (){playerTurn(0)});
        let one = document.getElementById("1");
        one.addEventListener('click', function (){playerTurn(1)});
        let two = document.getElementById("2");
        two.addEventListener('click', function (){playerTurn(2)});
        let three = document.getElementById("3");
        three.addEventListener('click', function (){playerTurn(3)});
        let four = document.getElementById("4");
        four.addEventListener('click', function (){playerTurn(4)});
        let five = document.getElementById("5");
        five.addEventListener('click', function (){playerTurn(5)});
        let six = document.getElementById("6");
        six.addEventListener('click', function (){playerTurn(6)});
        let seven = document.getElementById("7");
        seven.addEventListener('click', function (){playerTurn(7)});
        let eight = document.getElementById("8");
        eight.addEventListener('click', function (){playerTurn(8)});
    }

    let playerTurn = function(squareNum) {
        //prevents new moves after game has ended
        if (myModule.gameOver === true){
            return;
        }
        //prevents replays
        if (myModule.turnArray[squareNum] === 1){
            return;
        }
        if (myModule.playerTurn === 1){
            myModule.player1.playedArray[squareNum] = 1;
            myModule.playerTurn = 2;
            playersTurn.innerHTML = "Player O's turn"; 
            const square = document.getElementById(squareNum);
            square.innerHTML = "X";
            myModule.count++;
        } else {
            myModule.player2.playedArray[squareNum] = 1;
            myModule.playerTurn = 1;
            playersTurn.innerHTML = "Player X's turn";
            const square = document.getElementById(squareNum);
            square.innerHTML = "O";
            myModule.count++;
        }
        myModule.turnArray[squareNum] = 1;
        winnerStatus();
    }

   let winnerStatus = function() {
        if (myModule.isWinner(myModule.player1)){
            playersTurn.innerHTML = "Congratulation player X!"; 
            myModule.gameOver = true;  
        } else if (myModule.isWinner(myModule.player2)){
            playersTurn.innerHTML = "Congratulation player O!";
            myModule.gameOver = true; 
        } else if (myModule.turnArray === [1, 1, 1, 1, 1, 1, 1, 1, 1]){
            playersTurn.innerHTML = "It's a tie!";
            myModule.gameOver = true; 
        } else if (myModule.count === 9){
            playersTurn.innerHTML = "It's a tie!";
            myModule.gameOver = true; 
        }
    }

    myModule.resetBoard = function(){
        let zero = document.getElementById("0");
        zero.innerHTML = "";
        let one = document.getElementById("1");
        one.innerHTML = "";
        let two = document.getElementById("2");
        two.innerHTML = "";
        let three = document.getElementById("3");
        three.innerHTML = "";
        let four = document.getElementById("4");
        four.innerHTML = "";
        let five = document.getElementById("5");
        five.innerHTML = "";
        let six = document.getElementById("6");
        six.innerHTML = "";
        let seven = document.getElementById("7");
        seven.innerHTML = "";
        let eight = document.getElementById("8");
        eight.innerHTML = "";
    }

    myModule.newGame = function() {
        //resets all variables to initial values;
        myModule.turnArray = [0,0,0,0,0,0,0,0,0];
        myModule.count = 0;
        myModule.gameOver = false;
        myModule.playerTurn = 1;
        myModule.gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        
        //recreates players
        myModule.player1 = player("player1", 1);
        myModule.player2 = player("player2", 2);
        
        gamePlay.resetBoard();
    }
    return myModule;
})();

let gamePlay = gameBoard;
gamePlay.createBoard(gamePlay.gameBoard);
gamePlay.createButtons();


restart.addEventListener('click', () => {
    gamePlay.newGame();
    playersTurn.innerHTML = "Player X's turn";
});
