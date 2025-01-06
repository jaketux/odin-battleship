import { gameBoardModule } from  "./gameboard.js"
import { playerModule } from  "./player.js"
import "./styles.css";
import missImage from "./icons/miss.svg"
import boatsImage from "./icons/boat.svg"

const gameBoard = gameBoardModule()
const players = playerModule()

console.table(players.playerBoard)

players.player.placeAllShipsRandom()

players.computer.placeAllShipsRandom()

players.player.receiveAttack(0,0)
players.player.receiveAttack(1,2)

console.log(players.player.getGameBoard())


function displayModule() {

    function createDisplay(gameBoard, playername){

        const missImg = document.createElement('img')
        missImg.src = missImage
        
        const gridContainer = document.querySelector('.' + playername + '-game-grid')

        for (var i = 0; i < gameBoard.length; i++){
            let gameB = gameBoard[i]
            for (var j = 0; j < gameB.length;j++) {
                const missImg = document.createElement('img')
                missImg.src = missImage
                const boatImg = document.createElement('img')
                boatImg.src = boatsImage
                const gridSquare = document.createElement('div')
                gridSquare.classList.add('grid-game-square')
                gridContainer.appendChild(gridSquare)
                if (gameBoard[i][j] === 'No hit'){
                    gridSquare.appendChild(missImg)
                    missImg.classList.add('.small-icon')
                }
                if ((gameBoard[i][j] !== undefined && gameBoard[i][j] !== "No hit") && playername === "player"){
                    gridSquare.classList.add('contains-boat')
                    gridSquare.appendChild(boatImg)
                    boatImg.classList.add('.small-icon')                
                }
            }
        }

         

    }

    createDisplay(players.playerBoard,"player")
    createDisplay(players.computerBoard,"opponent")



}



displayModule()




// module.exports = {gameBoardModule: gameBoardModule}

