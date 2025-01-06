import {gameBoardModule} from "./gameboard.js"

const gameBoard = gameBoardModule()

// test to check a hit of the boat
test('Check the number of hits for the boat', () =>  {
    expect(gameBoard.receiveAttack(0,0)).toBe(
        "A ship has been hit!"
    )
})

// test to check a miss of the boat

test('Check the number of hits for the boat', () =>  {
    expect(gameBoard.receiveAttack(0,4)).toBe(
        "Attack missed!"
    )
})
