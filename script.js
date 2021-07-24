let player = (name, turnOrder) => {
    const sayHello = () => console.log('hello!');
    let winner = false;
    let turnBol = false;
    if (turnOrder === 1){
        turnBol = true;
    }
    let playedArray = [0,0,0,0,0,0,0,0,0];
    
    return { name, turnOrder, sayHello, winner, turnBol, playedArray};
};

var gameBoard = (function () {
    var myModule = {};
    myModule.gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    myModule.player1 = player("default", 1);
    myModule.player2 = player("computer", 2);
    




    myModule.createBoard = function(array) {
        let gridContainer = document.createElement("div");
        gridContainer.classList.add("gridContainer");
        gridContainer.innerHTML = "";
        for (let i = 0; i < 9; i++){
            let gridElement = document.createElement("div");
            gridElement.id = i;
            gridElement.innerHTML = array[i];
            gridElement.classList.add("gridElement");
            gridContainer.appendChild(gridElement);
            console.log(i);
        }
        document.body.appendChild(gridContainer);
    }


    myModule.isWinner = function(player) {
        let winner = false;
        let winCombinations = ["0,1,2", "3,4,5", "6,7,8", "0,3,6", "1,4,7", "2,5,8", "2,4,6", "0,4,8"];
        for (let i = 0; i < 8; i++) {
            let winCombo = winCombinations[i];
            let winComboArray = winCombo.split(",");
            //console.log(winComboArray);
            let count = 0;
            for (let i = 0; i < 3; i++) {
                if (player.playedArray[winComboArray[i]] === 1){
                    count++;
                }
            }
            if (count === 3){
                winner = true;
            }
        }
        return winner;
    }

    return myModule;
})();

let gamePlay = gameBoard;
gamePlay.createBoard(gamePlay.gameBoard);
console.log(gamePlay.gameBoard);
console.log(gamePlay.player1.name);
let test1 = gamePlay.isWinner(gamePlay.player1);
console.log(test1);


function createBoard(array){
    let gridContainer = document.createElement("div");
    gridContainer.classList.add("gridContainer");
    gridContainer.innerHTML = "";
    for (let i = 0; i < 9; i++){
        let gridElement = document.createElement("div");
        gridElement.id = i;
        gridElement.innerHTML = "O";
        gridElement.classList.add("gridElement");
        gridContainer.appendChild(gridElement);
        console.log(i);
    }
    document.body.appendChild(gridContainer);
}

