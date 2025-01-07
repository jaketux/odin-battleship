
import { gameControllerModule } from  "./gamecontroller.js"

import "./styles.css";

import missImage from "./icons/miss.svg"
import hitImage from "./icons/hit.svg"
import boatsImage from "./icons/boat.svg"

// Need to implement the annoucement of turns and winner of the game in the DOM, then also add the system for players to place ships prior to game commencing.


function displayController() {

    const playerName = document.querySelector('#player-name')
    const gameBoardBox = document.querySelector('.gameboard-box')
    gameBoardBox.classList.remove('invisible')

    const game = gameControllerModule(playerName.value)

    function createDisplay(gameBoard, playername){

        const playerGridContainer = document.querySelector('.player-game-grid')
        const opponentGridContainer = document.querySelector('.opponent-game-grid')
        
        if (playername === "player"){
            for (var i = 0; i < gameBoard.length; i++){
                let gameB = gameBoard[i]
                for (var j = 0; j < gameB.length;j++) {
                    const missImg = document.createElement('img')
                    missImg.src = missImage
                    const boatImg = document.createElement('img')
                    boatImg.src = boatsImage
                    const hitImg = document.createElement('img')
                    hitImg.src = hitImage
                    const gridSquare = document.createElement('div')
                    gridSquare.classList.add('grid-game-square')
                    gridSquare.id = playername+i+j
                    gridSquare.addEventListener("click", function(){
                        const id = gridSquare.id
                        const firstChar = parseInt(id.charAt(id.length-2))
                        const secondChar = parseInt(id.charAt(id.length-1))
                        game.playRound(firstChar,secondChar)
                        playerGridContainer.innerHTML = ""
                        opponentGridContainer.innerHTML = ""
                        createDisplay(game.playerBoard,"player")
                        createDisplay(game.computerBoard,"opponent")

                    })
                    playerGridContainer.appendChild(gridSquare)
                    if (gameBoard[i][j] === 'No hit'){
                        gridSquare.appendChild(missImg)
                        missImg.classList.add('small-icon')
                    }
                    if (gameBoard[i][j] === 'Hit'){
                        gridSquare.appendChild(hitImg)
                        gridSquare.classList.add('hit-boat')
                        hitImg.classList.add('small-icon')
                    }
                    if ((gameBoard[i][j] !== undefined && gameBoard[i][j] !== "No hit" && gameBoard[i][j] !== "Hit") && playername === "player"){
                        gridSquare.classList.add('contains-boat')
                        gridSquare.appendChild(boatImg)
                        boatImg.classList.add('small-icon')                
                    }
                }
            }
        }
        if (playername === "opponent"){
            for (var i = 0; i < gameBoard.length; i++){
                let gameB = gameBoard[i]
                for (var j = 0; j < gameB.length;j++) {
                    const missImg = document.createElement('img')
                    missImg.src = missImage
                    const boatImg = document.createElement('img')
                    boatImg.src = boatsImage
                    const hitImg = document.createElement('img')
                    hitImg.src = hitImage
                    const gridSquare = document.createElement('div')
                    gridSquare.classList.add('grid-game-square')
                    gridSquare.id = playername+i+j
                    gridSquare.addEventListener("click", function(){
                        const id = gridSquare.id
                        const firstChar = parseInt(id.charAt(id.length-2))
                        const secondChar = parseInt(id.charAt(id.length-1))
                        game.playRound(firstChar,secondChar)
                        playerGridContainer.innerHTML = ""
                        opponentGridContainer.innerHTML = ""
                        createDisplay(game.playerBoard,"player")
                        createDisplay(game.computerBoard,"opponent")
                    })
                    opponentGridContainer.appendChild(gridSquare)
                    if (gameBoard[i][j] === 'No hit'){
                        gridSquare.appendChild(missImg)
                        missImg.classList.add('small-icon')
                    }
                    if (gameBoard[i][j] === 'Hit'){
                        gridSquare.appendChild(hitImg)
                        gridSquare.classList.add('hit-boat')
                        hitImg.classList.add('small-icon')
                    }
                    if ((gameBoard[i][j] !== undefined && gameBoard[i][j] !== "No hit" && gameBoard[i][j] !== "Hit") && playername === "player"){
                        gridSquare.classList.add('contains-boat')
                        gridSquare.appendChild(boatImg)
                        boatImg.classList.add('small-icon')                
                    }
                }
            }
        }

        document.addEventListener('computerMove', function(){
            playerGridContainer.innerHTML = ""
            opponentGridContainer.innerHTML = ""
            createDisplay(game.playerBoard,"player")
            createDisplay(game.computerBoard,"opponent")
        })

    }



    createDisplay(game.playerBoard,"player")
    createDisplay(game.computerBoard,"opponent")

    return { createDisplay }

}

const startButton = document.querySelector("#start-btn")

startButton.addEventListener("click", function(){
    displayController()
})







