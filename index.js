function shipModule() {

    function checkStatus(ship){
        let lengthOfShip = ship.shipLength
        let countOfHits = 0
        for (i = 0; i<lengthOfShip;i++){
            if (ship.numberOfHits[i] !== "" && ship.numberOfHits[i] !== null && ship.numberOfHits[i] !== undefined){
                countOfHits++
            }
        }
        if (countOfHits === lengthOfShip){
            return true
        } else {
            return false
        }
    }

    function hit(index,ship){
        ship.numberOfHits[index] = "X"
        ship.shipSunk = checkStatus(ship)
        return ship
    }

    const carrierShip = {
        numberOfHits: [,,,,,],
        shipLength: 5,
        shipSunk: checkStatus(this)
    }

    const battleShip = {
        numberOfHits: [,,,,],
        shipLength: 4,
        shipSunk: checkStatus(this)
    }

    const destroyerShip = {
        numberOfHits: [,,,],
        shipLength: 3,
        shipSunk: checkStatus(this)
    }

    const submarineShip = {
        numberOfHits: [,,,],
        shipLength: 3,
        shipSunk: checkStatus(this)
    }

    const patrolBoatShip = {
        numberOfHits: [,,],
        shipLength: 2,
        shipSunk: checkStatus(this)
    }

    return {checkStatus,hit}
}
 

function gameBoard (){
    let gameBoardArray = [
    [,,,,,,,,,,],
    [,,,,,,,,,,],
    [,,,,,,,,,,],
    [,,,,,,,,,,],
    [,,,,,,,,,,],
    [,,,,,,,,,,],
    [,,,,,,,,,,],
    [,,,,,,,,,,],
    [,,,,,,,,,,],
    [,,,,,,,,,,],
]

}

// create a 10 by 10 grid

// allow each of the ships to occupy the grid in either horizontal or vertical orientation

const battleShipModule = shipModule()



module.exports = shipModule