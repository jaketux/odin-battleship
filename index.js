import { player, computer, game, playRound } from  "./gamecontroller.js"

import "./styles.css";

import missImage from "./icons/miss.svg"
import hitImage from "./icons/hit.svg"
import boatsImage from "./icons/boat.svg"



function createDisplay(playername) {

    updateTurnText()

    const gameBoardBox = document.querySelector('.gameboard-box')
    gameBoardBox.classList.remove('invisible')

    const mainBox = document.querySelector('.input-box')

    if (mainBox){
        mainBox.classList.add('invisible')
    }

    const playerGridContainer = document.querySelector('.player-game-grid');
    const opponentGridContainer = document.querySelector('.opponent-game-grid');

    const gridContainer = playername === "player" ? playerGridContainer : opponentGridContainer

    gridContainer.innerHTML = ""

    const gameBoard = playername === "player" ? player.getGameBoard() : computer.getGameBoard();
    
    for (let i = 0; i < gameBoard.length; i++){
        for (let j = 0; j < gameBoard[i].length;j++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-game-square')
            gridSquare.id = `${"square"}-${i}-${j}`
            gridSquare.replaceWith(gridSquare.cloneNode(true));
            gridSquare.addEventListener("click", function(){
                const id = gridSquare.id
                const firstChar = parseInt(id.charAt(id.length-3))
                const secondChar = parseInt(id.charAt(id.length-1))
                playRound(firstChar,secondChar) 
                createDisplay("player")
                createDisplay("opponent")
            })

            if (playername === "player") {
                if (gameBoard[i][j] === 'No hit'){
                    const missImg = document.createElement('img');
                    missImg.src = missImage;
                    missImg.classList.add('small-icon');
                    gridSquare.appendChild(missImg);
                } else if (gameBoard[i][j] === 'Hit'){
                    const hitImg = document.createElement('img');
                    hitImg.src = hitImage;
                    hitImg.classList.add('small-icon');
                    gridSquare.classList.add('hit-boat');
                    gridSquare.style.pointerEvents = 'none';
                    gridSquare.appendChild(hitImg);
                } else if (gameBoard[i][j] && gameBoard[i][j]!== 'No hit' && gameBoard[i][j] !== "Hit"){
                    const boatImg = document.createElement('img');
                    boatImg.src = boatsImage;
                    boatImg.classList.add('small-icon');
                    gridSquare.classList.add('contains-boat');
                    gridSquare.appendChild(boatImg);
                }
            } else {
                if (gameBoard[i][j] === 'No hit'){
                    const missImg = document.createElement('img');
                    missImg.src = missImage;
                    missImg.classList.add('small-icon');
                    gridSquare.appendChild(missImg);
                } else if (gameBoard[i][j] === 'Hit'){
                    const hitImg = document.createElement('img');
                    hitImg.src = hitImage;
                    hitImg.classList.add('small-icon');
                    gridSquare.classList.add('hit-boat');
                    gridSquare.appendChild(hitImg);
                }
            }
                gridContainer.appendChild(gridSquare)
            }
        } 

}

function updateTurnText() {
    const playerField = document.querySelector('#player-name')
    const playerName = playerField.value
    const turnText = document.querySelector('.turn-text')
    if(game.returnWinner() !== 0){
        const restartBtn = document.querySelector('#restart-btn')
        restartBtn.classList.remove('invisible')
        if (game.returnWinner() === "Player"){
            turnText.textContent = playerName+" has won the game! Click Restart Game to play again."
        } else if (game.returnWinner() === "Computer"){
            turnText.textContent = "Computer has won the game! Click Restart Game to play again."
        }
        restartBtn.addEventListener("click", function(){
            game.startNewGame()
            turnText.textContent = playerName+"'s turn to move!"
        })
    } else {
        if (game.getActivePlayer() === "Player"){
            turnText.textContent = playerName+"'s turn to move!"
        } else {
            turnText.textContent = "Computer's turn to move!"
        }
    }
}

const startButton = document.querySelector("#start-btn")
    
startButton.addEventListener("click", function(){
    createDisplay("player")
    createDisplay("opponent")
})

    export { createDisplay, updateTurnText }


