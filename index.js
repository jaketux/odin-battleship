import { player, computer, game, playRound } from  "./gamecontroller.js"

import "./styles.css";

import missImage from "./icons/miss.svg"
import hitImage from "./icons/hit.svg"
import boatsImage from "./icons/boat.svg"

const shipSelection = document.querySelector('.ship-selection-section')


function createDisplay(playername) {

    turnText.style.display = "block"

    updateTurnText()

    const gameBoardBox = document.querySelector('.gameboard-box')
    gameBoardBox.classList.remove('invisible')

    commenceButton.classList.add('invisible')

    const mainBox = document.querySelector('.input-box')

    mainBox.style.display = "none"

    shipSelection.style.display = "none"

    const opponentSection = document.querySelector('.opponent-section');

    opponentSection.style.display = "block"

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
                    gridSquare.style.cursor = "not-allowed"
                    gridSquare.appendChild(missImg);
                } else if (gameBoard[i][j] === 'Hit'){
                    const hitImg = document.createElement('img');
                    hitImg.src = hitImage;
                    hitImg.classList.add('small-icon');
                    gridSquare.classList.add('hit-boat');
                    gridSquare.style.cursor = "not-allowed"
                    gridSquare.appendChild(hitImg);
                } else {
                    gridSquare.style.cursor = "pointer"

                }
            }
                gridContainer.appendChild(gridSquare)
            }
        } 

}

function createPreDisplay(){

    const gameBoardBox = document.querySelector('.gameboard-box')
    gameBoardBox.classList.remove('invisible')

    const mainBox = document.querySelector('.input-box')

    mainBox.style.display = "none"

    turnText.style.display = "none"

    shipSelection.style.display = "block"

    const playerGridContainer = document.querySelector('.player-game-grid');
    const opponentSection = document.querySelector('.opponent-section');

    if (opponentSection){
        opponentSection.style.display = "none"
    }

    playerGridContainer.innerHTML = ""

    const gameBoard = player.getGameBoard() 
    
    for (let i = 0; i < gameBoard.length; i++){
        for (let j = 0; j < gameBoard[i].length;j++) {
            const gridSquare = document.createElement('div');
            gridSquare.classList.add('grid-game-square')
            gridSquare.id = `${"square"}-${i}-${j}`
		if (gameBoard[i][j] && gameBoard[i][j]!== 'No hit' && gameBoard[i][j] !== "Hit"){
		    const boatImg = document.createElement('img');
		    boatImg.src = boatsImage;
		    boatImg.classList.add('small-icon');
		    gridSquare.classList.add('contains-boat');
		    gridSquare.appendChild(boatImg);
		}
        playerGridContainer.appendChild(gridSquare)
        } 
    }

    commenceButton.classList.remove('invisible')

} 

const randomiseButton = document.querySelector('.random')

randomiseButton.addEventListener('click', function(){
    const playerGridContainer = document.querySelector('.player-game-grid');
    playerGridContainer.innerHTML = ""
    player.resetBoard()
    player.placeAllShipsRandom()
    draggableIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
            element.classList.add('placed')
        }
    })
    createPreDisplay()
})

const rotateButton = document.querySelector('.rotate')
const shipsBox = document.querySelector('#ships-box')

rotateButton.addEventListener('click', function(){
    if(shipsBox.classList.contains('horizontal')){
        shipsBox.classList.remove('horizontal')
        shipsBox.classList.add('vertical')    
    } else if (shipsBox.classList.contains('vertical')){
        shipsBox.classList.remove('vertical')
        shipsBox.classList.add('horizontal')
    }
    
    if (currentOrientation === "horizontal") {
        currentOrientation = "vertical"
        console.log(currentOrientation)
    } else if (currentOrientation === "vertical") {
        currentOrientation = "horizontal"
        console.log(currentOrientation)
    }
})

const resetButton = document.querySelector('.reset')

resetButton.addEventListener('click', function(){
    const playerGridContainer = document.querySelector('.player-game-grid');
    playerGridContainer.innerHTML = ""
    player.resetBoard()
    draggableIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) {
            element.draggable = true;
            element.style.cursor = "grab";
            element.classList.remove('placed') 
            const ship = player.shipObjects[id];
            if (ship) {
                ship.shipPlaced = false; // This ensures shipPlaced is false
                console.log(ship)
            }  
            
        }
    })
    
    createPreDisplay()
})

const turnText = document.querySelector('.turn-text')

function updateTurnText() {
    const playerField = document.querySelector('#player-name')
    const playerName = playerField.value
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
            draggableIds.forEach((id) => {
                const element = document.getElementById(id)
                if (element) {
                    element.draggable = true;
                    element.style.cursor = "grab";
                    element.classList.remove('placed') 
                    const ship = player.shipObjects[id];
                    if (ship) {
                        ship.shipPlaced = false; // This ensures shipPlaced is false
                        console.log(ship)
                    }  
                }
            })
            createPreDisplay()
            restartBtn.classList.add('invisible')
        })
    } else {
        if (game.getActivePlayer() === "Player"){
            turnText.textContent = playerName+"'s turn to move!"
        } else {
            turnText.textContent = "Computer's turn to move!"
        }
    }
}

let currentOrientation = "horizontal"

const startButton = document.querySelector("#start-btn")

startButton.addEventListener("click", function(){
    createPreDisplay()
})

const commenceButton = document.querySelector('#commence-btn')

commenceButton.addEventListener("click", function(){
    computer.placeAllShipsRandom()
    createDisplay("player")
    createDisplay("opponent")
})

let draggedElement = null
let initialPosition = { x: 0, y: 0, parent: null };


const draggableIds = [
    'carrierShip', 
    'battleShip', 
    'destroyerShip', 
    'submarineShip', 
    'patrolBoatShip'
]

draggableIds.forEach((id) => {
    const element = document.getElementById(id)
    if (element) {
        element.addEventListener('mousedown', (event) => {
            draggedElement = event.target
            const rect = draggedElement.getBoundingClientRect();
            initialPosition = {
                x: rect.left,
                y: rect.top,
                parent: draggedElement.parentElement
            };
            draggedElement.style.position = 'absolute'
            draggedElement.style.pointerEvents = 'none'
            document.body.appendChild(draggedElement)
            moveAt(event.pageX, event.pageY)    
        })
    }
})

function moveAt(pageX, pageY) {
    draggedElement.style.left = pageX + 'px'
    draggedElement.style.top = pageY + 'px'
}

document.addEventListener('mousemove', (event) => {
    if (draggedElement) {
        moveAt(event.pageX, event.pageY)
    }
})

document.addEventListener('mouseup', (event) => {
    if (draggedElement){
        const dropTarget = document.elementFromPoint(event.clientX, event.clientY)
        if (dropTarget && dropTarget.classList.contains('grid-game-square')){
            const id = dropTarget.id
            const firstChar = parseInt(id.charAt(id.length-3))
            const secondChar = parseInt(id.charAt(id.length-1))
            const shipObject = player.shipObjects[draggedElement.id];

            if (shipObject) {
                player.placeShip (shipObject, firstChar, secondChar, currentOrientation)
                createPreDisplay()
                if (shipObject.shipPlaced = "true"){
                    draggedElement.classList.add('placed')
                }
            } else {
                console.error('No matching ship found')
            }
        }
        draggedElement.style.left = initialPosition.x + 'px';
        draggedElement.style.top = initialPosition.y + 'px';
        draggedElement.style.position = ''
        draggedElement.style.pointerEvents = ''
        initialPosition.parent.appendChild(draggedElement);
        draggedElement.draggable = false;
        draggedElement.style.cursor = "not-allowed";
        draggedElement = null
    }
})






    export { createDisplay, updateTurnText, createPreDisplay }


