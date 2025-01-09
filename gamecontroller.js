import { gameBoardModule } from  "./gameboard.js"
import { createDisplay, updateTurnText } from  "./index.js"

const player = gameBoardModule()
const playerBoard = player.getGameBoard()

const computer = gameBoardModule()
const computerBoard = computer.getGameBoard()

player.placeAllShipsRandom()
computer.placeAllShipsRandom()




export const gameController = function (playerName){

    const players = [playerName, "Computer"]

    let activePlayer = players[0]

    let winnerOfGame = 0 

    const checkWinner = function() {

        if (player.checkSunk()){
            winnerOfGame = players[1]
            updateTurnText(players[1])
        } else if (computer.checkSunk()){
            winnerOfGame = players[0]
            console.log(players[0]+" is the winner!")
            updateTurnText(players[0])
        } 
    }

    const returnWinner = function() {
        return winnerOfGame
    }

    const resetWinner = function(){
        winnerOfGame = 0
        activePlayer = players[0]
    }

    const switchPlayerTurn = function(){
        activePlayer = activePlayer === players[0] ? players[1] : players[0]  
    }
    
    const getActivePlayer = function(){
        return activePlayer
    }

    function makeComputerMove() {
        let compX = Math.floor(Math.random() * 10)
        let compY = Math.floor(Math.random() * 10)
        player.receiveAttack(compX,compY)
        checkWinner()
        switchPlayerTurn()
        newRound()
    }

    const playRound = function(x,y){

        if (returnWinner() !== 0) {
            return
        }

        if (getActivePlayer() === activePlayer) {
            if (activePlayer === players[0]){
                computer.receiveAttack(x,y)
                checkWinner()
                switchPlayerTurn()
                newRound()
                makeComputerMove()
                createDisplay(playerBoard, "player")
                createDisplay(computerBoard, "opponent")
        } else if (activePlayer === players[1]){
                checkWinner()
                switchPlayerTurn()
                newRound()
            } 
        }

    }

    const startNewGame = function () {
        player.resetBoard()
        computer.resetBoard()
        resetWinner()
        player.placeAllShipsRandom()
        computer.placeAllShipsRandom()
        createDisplay(player.getGameBoard(), "player")
        createDisplay(computer.getGameBoard(), "opponent")
        updateTurnText()
    }
    
    const newRound = function(){
        player.getGameBoard()
        computer.getGameBoard()
    }

    newRound()

    return { playRound, getActivePlayer, checkWinner, returnWinner, resetWinner, switchPlayerTurn, getActivePlayer, startNewGame }

}



export { playerBoard, computerBoard }

