const shipModule = require('./index')

const ship = shipModule()

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