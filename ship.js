function createShip (name, length){

    let numberOfHits = 0
    let shipSunk = false
    let shipLength = length 
    let shipPlaced 

    function checkStatus(){
        if (numberOfHits === shipLength) {
            return true
        }
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

    function reset() {
        numberOfHits = 0;
        shipSunk = false
        shipPlaced = false
    }

    return { hit, getStatus, shipLength, reset, shipPlaced}
}

export { createShip }