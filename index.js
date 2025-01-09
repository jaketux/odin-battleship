
import { playerBoard, computerBoard, gameController } from  "./gamecontroller.js"

import "./styles.css";

import missImage from "./icons/miss.svg"
import hitImage from "./icons/hit.svg"
import boatsImage from "./icons/boat.svg"

const playerName = "Player"

const controller = gameController("Player")
    
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
                    controller.playRound(firstChar,secondChar) 
                    createDisplay(playerBoard,"player")
                    createDisplay(computerBoard,"opponent")
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
        createDisplay(playerBoard,"player")
        createDisplay(computerBoard,"opponent")
    
    })

    function updateTurnText() {
        const turnText = document.querySelector('.turn-text')
        if(controller.returnWinner() !== 0){
            const restartBtn = document.querySelector('#restart-btn')
            restartBtn.classList.remove('invisible')
            turnText.textContent = controller.returnWinner()+" has won the game! Click Restart Game to play again."
            restartBtn.addEventListener("click", function(){
                const playerGridContainer = document.querySelector('.player-game-grid');
                const opponentGridContainer = document.querySelector('.opponent-game-grid');
                playerGridContainer.innerHTML = ""
                opponentGridContainer.innerHTML = ""
                controller.startNewGame()
                controller
            })
        } else {
            turnText.textContent = controller.getActivePlayer()+"'s turn to move!"
        }
    }


    export {updateTurnText}


