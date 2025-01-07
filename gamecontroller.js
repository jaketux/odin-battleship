import { gameBoardModule } from  "./gameboard.js"

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

    const resetBoard = function(){
        player.resetBoard()
        computer.resetBoard()
    }

    let winnerOfGame = 0 

    const checkWinner = function() {

        if (player.checkSunk()){
            winnerOfGame = players[1]
            console.log(players[1]+" is the winner!")
        } else if (computer.checkSunk()){
            winnerOfGame = players[0]
            console.log(players[0]+" is the winner!")
        } 
    }

    const returnWinner = function() {
        return winnerOfGame
    }

    const resetWinner = function(){
        winnerOfGame = 0
        activePlayer = players[0]
    }
 
    const playRound = function(x,y){

        if (getActivePlayer() === activePlayer) {
            if (activePlayer === players[0]){
                computer.receiveAttack(x,y)
                checkWinner()
                switchPlayerTurn()
                newRound()
                setTimeout(() => {
                    let compX = Math.floor(Math.random() * 10)
                    let compY = Math.floor(Math.random() * 10)
                    playRound(compX,compY)
                    const computerMoveEvent = new CustomEvent('computerMove', {
                        detail: "The computer made a move"
                    })
                    document.dispatchEvent(computerMoveEvent)
                },500)
            } else if (activePlayer === players[1]){
                player.receiveAttack(x,y)
                checkWinner()
                switchPlayerTurn()
                newRound()
            } 
        }
    }

    newRound()

    return { player, computer, playerBoard, computerBoard, playRound, getActivePlayer, checkWinner, returnWinner, resetBoard, resetWinner }

}

export { gameControllerModule }



//check to see whether hit or miss 

// if hit, check to see if the hit sunk all of the ships

// if not, player gets another turn for hitting a ship

// computer takes a turn

// check to see whether hit or miss

    // if hit, check to see if the hit sunk all of the ships

// if not, computer gets another turn for hitting a ship