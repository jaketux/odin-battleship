
import { gameControllerModule } from  "./gamecontroller.js"

import "./styles.css";

import missImage from "./icons/miss.svg"
import hitImage from "./icons/hit.svg"
import boatsImage from "./icons/boat.svg"

// Need to implement the annoucement of turns and winner of the game in the DOM, then also add the system for players to place ships prior to game commencing.
const playerName = "Player"
const game = gameControllerModule(playerName)


function updateTurnText() {
    const turnText = document.querySelector('.turn-text')
    if(game.returnWinner() !== 0){
        turnText.textContent = game.returnWinner()+" has won the game! Click Restart Game to play again."
        const restartBtn = document.querySelector('#restart-btn')
        restartBtn.addEventListener("click", function(){
            game.resetBothBoards()
            game.resetWinner()
            const playerGridContainer = document.querySelector('.player-game-grid');
            const opponentGridContainer = document.querySelector('.opponent-game-grid');
            playerGridContainer.innerHTML = ""
            opponentGridContainer.innerHTML = ""
            gameControllerModule(playerName)
            createDisplay(game.playerBoard,"player")
            createDisplay(game.computerBoard,"opponent")
        })
        restartBtn.classList.remove('invisible')
    } else {
        turnText.textContent = game.getActivePlayer()+"'s turn to move!"
    }
}
    



    export const createDisplay = (gameBoard, playername) => {
        
        updateTurnText()

        const gameBoardBox = document.querySelector('.gameboard-box')
        gameBoardBox.classList.remove('invisible')

        const mainBox = document.querySelector('.input-box')

        if (mainBox){
            mainBox.remove()
        }


        const playerGridContainer = document.querySelector('.player-game-grid');
        const opponentGridContainer = document.querySelector('.opponent-game-grid');

        const gridContainer = playername === "player" ? playerGridContainer : opponentGridContainer

        gridContainer.innerHTML = ""
        
        for (let i = 0; i < gameBoard.length; i++){
            for (let j = 0; j < gameBoard[i].length;j++) {
                const gridSquare = document.createElement('div');
                gridSquare.classList.add('grid-game-square')
                gridSquare.id = `${playerName}-${i}-${j}`
                gridSquare.addEventListener("click", function(){
                    const id = gridSquare.id
                    const firstChar = parseInt(id.charAt(id.length-3))
                    const secondChar = parseInt(id.charAt(id.length-1))
                    game.playRound(firstChar,secondChar) 
                    createDisplay(game.playerBoard,"player")
                    createDisplay(game.computerBoard,"opponent")
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
    
        return { createDisplay }
    }

    const startButton = document.querySelector("#start-btn")
    
    startButton.addEventListener("click", function(){
        createDisplay(game.playerBoard,"player")
        createDisplay(game.computerBoard,"opponent")
    
    })


    export {updateTurnText}


