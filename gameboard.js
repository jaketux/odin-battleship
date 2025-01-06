import { createShip } from  "./ship.js"

function gameBoardModule() {

    const carrierShip = createShip("carrierShip",5)
    const battleShip = createShip("battleShip",4)
    const destroyerShip = createShip("destroyerShip",3)
    const submarineShip = createShip("submarineShip",3)
    const patrolBoatShip = createShip("patrolBoatShip",2)

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

    const placeShip = function (ship, x, y, direction){

        if (direction === "horizontal"){
            if (y + ship.shipLength > 10) {
                return "Error, ship exceeds boards bounds"
            }
            
            for (i = 0; i<ship.shipLength;i++){
                if (gameBoardArray[x][y+i] !== undefined) {
                    return "Error, ship has already been placed here"
                }
            }

            for (i = 0; i<ship.shipLength; i++) {
                gameBoardArray[x][y+i] = ship
            }

        } else if (direction === "vertical"){
            if (x + ship.shipLength > 10) {
                return "Error, ship exceeds boards bounds"
            }

            for (i = 0; i<ship.shipLength;i++){
                if (gameBoardArray[y+i][x] !== undefined) {
                    return "Error, ship has already been placed here"
                }
            }
            for (i = 0; i<ship.shipLength; i++) {
                gameBoardArray[x+i][y] = ship
            }
        }
        return gameBoardArray
    }

    const placeShipRandom = function(ship){
        let randomNumber = Math.floor(Math.random() * 2)
        let x = Math.floor(Math.random() * 10)
        let y = Math.floor(Math.random() * 10)
        let direction
        let placedSuccessfully = false
        if (randomNumber === 0) {
            direction = "horizontal"
        } else if (randomNumber === 1){
            direction = "vertical"
        }
        
        while (!placedSuccessfully){
            if (direction === "horizontal" && y + ship.shipLength <= 10){
                let canPlace = true
                for (i = 0; i < ship.shipLength; i++){
                    if (gameBoardArray[x][y+i] !== undefined) {
                        canPlace = false
                        break
                    }
                }
                if (canPlace){
                    for (i = 0; i < ship.shipLength; i++){
                        gameBoardArray[x][y+i] = ship
                    }
                    placedSuccessfully = true
                } else {
                        x = Math.floor(Math.random() * 10)
                        y = Math.floor(Math.random() * 10)
                }
            } else if (direction === "vertical" && x + ship.shipLength <= 10){
                let canPlace = true
                for (i = 0; i < ship.shipLength; i++){
                    if (gameBoardArray[x+i][y] !== undefined) {
                        canPlace = false
                        break
                    }
                }

                if (canPlace){
                    for (i = 0; i < ship.shipLength; i++){
                        gameBoardArray[x+i][y] = ship
                    }
                    placedSuccessfully = true
                } else {
                    x = Math.floor(Math.random() * 10)
                    y = Math.floor(Math.random() * 10)
                }
            } else {
                x = Math.floor(Math.random() * 10)
                y = Math.floor(Math.random() * 10)
            }
        }
        return gameBoardArray
    }

    function placeAllShipsRandom(){
        let ships = [carrierShip, battleShip, destroyerShip, submarineShip, patrolBoatShip]
        ships.forEach(ship => {
            let placed = false
            while (!placed) {
                placeShipRandom(ship)
                placed = true
            }
        })
    }
    
    function receiveAttack(location1, location2){
        if (gameBoardArray[location1][location2] === undefined){
            gameBoardArray[location1][location2] = "No hit"
            return "Attack missed!"
        } else {
            gameBoardArray[location1][location2].hit()
            return "A ship has been hit!"
        }
    }

    function checkSunk(carrierShip, battleShip, destroyerShip, submarineShip, patrolBoatShip) {
        if (carrierShip.getStatus().shipSunk && 
        battleShip.getStatus().shipSunk && 
        destroyerShip.getStatus().shipSunk && 
        submarineShip.getStatus().shipSunk && 
        patrolBoatShip.getStatus().shipSunk
        ){
            return "All of your ships have been sunk!"
        }
        return "You are still in the game!"
    }
    
    return {placeShip, placeAllShipsRandom, getGameBoard, receiveAttack, checkSunk}

}

export { gameBoardModule }

const carrierShip = createShip("carrierShip",5)


console.log(carrierShip)