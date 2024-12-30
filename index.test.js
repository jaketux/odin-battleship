const {shipModule: shipModule, gameBoardModule: gameBoardModule} = require('./index')

const ship = shipModule()

const gameBoard = gameBoardModule()

// test to check a hit of the boat and whether it is sunk 

test('Check the number of hits for the boat', () =>  {
    expect(ship.hit(4,{
        numberOfHits: ["X","X","X","X",],
        shipLength: 5,
    })).toEqual({
        numberOfHits: ["X","X","X","X","X"],
        shipLength: 5,
        shipSunk: true
    })
})

test('Check to see whether a boat is being placed horizontally correctly', () => {
    expect (gameBoard.placeShip(gameBoard.ships[0],0,0,"horizontal")).toEqual([
        ["carrierShip",,,,,,,,,],
        [,,,,,,,,,,],
        [,,,,,,,,,,],
        [,,,,,,,,,,],
        [,,,,,,,,,,],
        [,,,,,,,,,,],
        [,,,,,,,,,,],
        [,,,,,,,,,,],
        [,,,,,,,,,,],
        [,,,,,,,,,,]
    ])
})