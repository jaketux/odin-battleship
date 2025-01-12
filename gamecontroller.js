import { gameBoardModule } from  "./gameboard.js"
import { createDisplay, createPreDisplay, updateTurnText } from  "./index.js"


const player = gameBoardModule()

const computer = gameBoardModule()

    const gameController = function (){

    const players = ["Player", "Computer"]

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

    let resetWinner = function(){
        console.log("Resetting winner...")
        winnerOfGame = 0
        activePlayer = players[0]
        console.log("Winner reset to:", winnerOfGame);
        console.log("Active player reset to:", activePlayer);
    }

    const switchPlayerTurn = function(){
        activePlayer = activePlayer === players[0] ? players[1] : players[0]  
    }
    
    const getActivePlayer = function(){
        if (activePlayer === players[0]){
            return players[0]
        } else {
            return players[1]
        }
    }

    function makeComputerMove() {
        let compX = Math.floor(Math.random() * 10)
        let compY = Math.floor(Math.random() * 10)
        player.receiveAttack(compX,compY)
        checkWinner()
        switchPlayerTurn()
        newRound()
    }

    
    const newRound = function(){
        player.getGameBoard()
        computer.getGameBoard()
    }

    const startNewGame = function () {
        player.resetBoard()
        computer.resetBoard()
        game.resetWinner()
        console.log(player.getGameBoard())
        console.log(computer.getGameBoard())
        updateTurnText()
    }

    newRound()

    return { players, newRound, getActivePlayer, checkWinner, makeComputerMove, returnWinner, resetWinner, switchPlayerTurn, getActivePlayer, startNewGame }

}

let game = gameController()

const playRound = function(x,y){

    if (game.returnWinner() !== 0) {
        return
    }
    
    let result = null

    if (game.getActivePlayer() === "Player") {
            console.log(game.returnWinner())
            result = computer.receiveAttack(x,y)
            if (result === "A ship has been hit!" || result === "Attack missed!") {
                game.checkWinner()
                game.switchPlayerTurn()
                game.newRound()
                createDisplay("player")
                createDisplay("opponent")
                game.makeComputerMove()
            }

    } else if (game.getActivePlayer() === "Computer"){
            game.checkWinner()
            game.switchPlayerTurn()
            game.newRound()
            createDisplay("player")
            createDisplay("opponent")
        } 
    }


export { player, computer, game, playRound }



