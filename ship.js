function createShip (name, length){

    let numberOfHits = 0
    let shipSunk = false
    let shipLength = length 
    function checkStatus(){
        return numberOfHits === shipLength
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
            shipLength: length,
            shipSunk: shipSunk
        }
    }

    if (shipSunk) {
        return "This ship has been sunk!"
    }

return {hit, getStatus, shipLength}
}

export { createShip }