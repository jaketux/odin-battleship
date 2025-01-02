    function createShip (name, length){

            let numberOfHits = 0
            let shipSunk = false

            function checkStatus(){
                return numberOfHits === length
            }
            
            function hit(){
                if (!shipSunk) {
                numberOfHits += 1
                shipSunk = checkStatus()
                }
            }

            function getStatus() {
                return {
                    name: name,
                    numberOfHits: numberOfHits,
                    shipSunk: shipSunk
                }
            }

            if (shipSunk) {
                return "This ship has been sunk!"
            }

        return {hit, getStatus}
    }

function gameBoardModule() {
    
    const carrierShip = createShip("carrierShip",5)
    const battleShip = createShip("battleShip",4)
    const destroyerShip = createShip("destroyerShip",3)
    const submarineShip = createShip("submarineShip",3)
    const patrolBoatShip = createShip("patrolBoatShip",2)
   
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
            if (y + ship.length > 10) {
                return "Error, ship exceeds boards bounds"
            }
            
            for (i = 0; i<ship.length;i++){
                if (gameBoardArray[x][y+i] !== undefined) {
                    return "Error, ship has already been placed here"
                }
            }

            for (i = 0; i<ship.length; i++) {
                gameBoardArray[x][y+i] = ship
            }

        } else if (direction === "vertical"){
            if (x + ship.length > 10) {
                return "Error, ship exceeds boards bounds"
            }

            for (i = 0; i<ship.length;i++){
                if (gameBoardArray[y+i][x] !== undefined) {
                    return "Error, ship has already been placed here"
                }
            }
            for (i = 0; i<ship.length; i++) {
                gameBoardArray[x+i][y] = ship
            }
        }
        return gameBoardArray
    }


    const placeShipRandom = function(ship){
        let randomNumber = Math.floor(Math.random() * 2)
        let placedSuccessfully = false
        let maxRetries = 100
        let retryCount = 0;

        while (!placedSuccessfully && retryCount < maxRetries){
            retryCount ++
            let x = Math.floor(Math.random() * 10)
            let y = Math.floor(Math.random() * 4)

            direction = randomNumber === 0 ? "horizontal" : "vertical"
        //horizontal direction
            if (direction === "horizontal" && y + ship.length <= 10){
            
                let canPlace = true

                for (i = 0; i < ship.length; i++){
                    if (gameBoardArray[x][y+i] !== undefined) {
                        canPlace = false
                        break
                    }
                }
                
                if (canPlace) {
                    for (i = 0; i < ship.length; i++) {
                        gameBoardArray[x][y+i] = ship
                    }
                    placedSuccessfully = true
                } else {
                    console.log("Failed to place ship, retrying")
                }
            } else if (direction === "vertical" && x + ship.length <= 10){
                
                let canPlace = true

                for (i = 0; i < ship.length; i++){
                    if (gameBoardArray[x+i][y] !== undefined) {
                        canPlace = false
                        break
                    }
                }

                if (canPlace) {
                    for (i = 0; i < ship.length; i++) {
                        gameBoardArray[x+i][y] = ship
                    }
                    placedSuccessfully = true
                } else {
                    console.log("Failed to place ship, retrying")
                }
            } else {
                console.log("Error: Ship exceeds board's bounds. Retrying...");
            }

            if (retryCount >= maxRetries){
                console.log("Failed to place ship after maximum attempts")
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

function playerModule(){

    const player = gameBoardModule()
    const playerBoard = player.getGameBoard()
    player.placeAllShipsRandom()

    const computer = gameBoardModule()
    const computerBoard = computer.getGameBoard()
    computer.placeAllShipsRandom()

    console.log(playerBoard)
    console.log(computerBoard)

}


playerModule()

module.exports = {gameBoardModule: gameBoardModule}