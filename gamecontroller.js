import { gameBoardModule } from  "./gameboard.js"
import { createDisplay, updateTurnText } from  "./index.js"

function gameControllerModule (playerName){

    const player = gameBoardModule()
    const playerBoard = player.getGameBoard()

    const computer = gameBoardModule()
    const computerBoard = computer.getGameBoard()

    player.placeAllShipsRandom()
    computer.placeAllShipsRandom()

    const players = [playerName, "Computer"]

    let activePlayer = players[0]

    const switchPlayerTurn = function(){
        activePlayer = activePlayer === players[0] ? players[1] : players[0]  
    }

    const getActivePlayer = function(){
        return activePlayer
    }

    const newRound = function(){
        player.getGameBoard()
        computer.getGameBoard()
    }

    const resetBothBoards = function(){
        player.resetBoard()
        computer.resetBoard()
    }

    let winnerOfGame = 0 

    const checkWinner = function() {

        if (player.checkSunk()){
            winnerOfGame = players[1]
            updateTurnText(players[1])
            createDisplay("player", "player")
            createDisplay("opponent", "opponent")
        } else if (computer.checkSunk()){
            winnerOfGame = players[0]
            console.log(players[0]+" is the winner!")
            createDisplay("player", "player")
            createDisplay("opponent", "opponent")

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
 
    function makeComputerMove() {
        let compX = Math.floor(Math.random() * 10)
        let compY = Math.floor(Math.random() * 10)
        player.receiveAttack(compX,compY)
        checkWinner()
        switchPlayerTurn()
        newRound()
    }

    const playRound = function(x,y){

        if (winnerOfGame !== 0) {
            return
        }

        if (getActivePlayer() === activePlayer) {
            if (activePlayer === players[0]){
                computer.receiveAttack(x,y)
                checkWinner()
                switchPlayerTurn()
                newRound()
                makeComputerMove()
                createDisplay("player", "player")
                createDisplay("opponent", "opponent")
        } else if (activePlayer === players[1]){
                checkWinner()
                switchPlayerTurn()
                newRound()
            } 
        }
    }
    


    newRound()

    return { player, computer, playerBoard, computerBoard, playRound, getActivePlayer, checkWinner, returnWinner, resetBothBoards, resetWinner }

}

export { gameControllerModule }

