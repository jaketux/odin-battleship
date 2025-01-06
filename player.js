import {gameBoardModule} from  "./gameboard.js"

function playerModule(){

    const player = gameBoardModule()
    const playerBoard = player.getGameBoard()

    const computer = gameBoardModule()
    const computerBoard = computer.getGameBoard()

}

playerModule()