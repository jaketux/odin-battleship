function shipModule() {

    const checkStatus = function(ship){
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

    const hit = function(index,ship){
        ship.numberOfHits[index] = "X"
        ship.shipSunk = checkStatus(ship)
        return ship
    }

    const ships = [{
        name: "carrierShip",
        numberOfHits: [,,,,,],
        shipLength: 5,
        shipSunk: checkStatus(this)
    },
    {
        name: "battleShip",
        numberOfHits: [,,,,],
        shipLength: 4,
        shipSunk: checkStatus(this)
    },
    {
        name: "destroyerShip",
        numberOfHits: [,,,],
        shipLength: 3,
        shipSunk: checkStatus(this)
    },
    {
        name: "submarineShip",
        numberOfHits: [,,,],
        shipLength: 3,
        shipSunk: checkStatus(this)
    },
    {
        name: "patrolBoatShip",
        numberOfHits: [,,],
        shipLength: 2,
        shipSunk: checkStatus(this)
    }]

    const getShips = function(){
        return ships
    }

    return {getShips, checkStatus, hit}
}
 
const battleShipModule = shipModule()

function gameBoardModule() {

    const ships = battleShipModule.getShips()

    // create a 10 by 10 2d grid
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
        [,,,,,,,,,,]
    ]

    const getGameBoard = function(){
        return gameBoardArray
    }

// allow each of the ships to be placed and occupy the grid in either horizontal or vertical orientation
    const placeShip = function (ship, x, y, direction){

        //horizontal direction
        if (direction === "horizontal"){
            for (i=0;i<ship.shipLength;i++){
                gameBoardArray[x][y] = ship.name
            }
        }
        // //vertical direction
        // if (direction === "vertical"){

        return gameBoardArray
    }

    return {placeShip, ships, getGameBoard}

}


module.exports = {shipModule: shipModule, gameBoardModule: gameBoardModule}