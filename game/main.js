function main(input) {
    input = input.toLowerCase().trim();
    if(cube.solving) {
        let turns = input.split(' ');
        for(let i = 0; i < turns.length; i++) {
            executeTurn(input);
        }
        return cubeToString();
    }
    // If you haven't started the game yet, you have to say if you want instructions or not
    else if(currentLocation === 'intro') {
        if(input === 'no' || input === 'n') {
            currentLocation = driveway;
            // let algorithm = scrambleCube();
            // for(let i = 0; i < algorithm.length; i++) {
            //     executeTurn(algorithm[i].toLowerCase());
            // }
            return currentLocation.description + '\n\n';
        }
        else if(input === 'yes' || input === 'y') {
            currentLocation = driveway;
            let algorithm = scrambleCube();
            for(let i = 0; i < algorithm.length; i++) {
                executeTurn(algorithm[i].toLowerCase());
            }
            return "Scattered around the mountain range that you're currently on are various versions of abandoned mining towns. Some are tiny with only a few buildings and no accessable mine anymore whereas others still have many standing buildings with much of their contents still intact. There may even be multiple entrances to a mine in the big towns. I will be your eyes and hands. Direct me with 1 or 2 word commands. I only look at the first 5 letters of words, so you'll have to use \"ne\" for \"northeast\" in order to distinguish from \"north\". For information on how to end your adventure, etc., type \"info\".\n\n"
            + currentLocation.description + '\n\n';
        }
        else {
            return 'Please answer the question.\n\n';
        }
    }
    else if(input === 'quit') {
        // Set quit flag to check on next input
        currentLocation.quitted = true;
        return 'Are you sure you want to quit?\nIf you were to quit now you would score ' + score + ' points.\n\n';
    }
    // If you quitted, confirm quit
    else if(currentLocation.quitted) {
        // reset quit flag if you don't actually want to quit
        if(input === 'no' || input === 'n') {
            currentLocation.quitted = false;
            return 'OK\n\n';
        }
        // Reset game and quit flag when you quit
        else if(input === 'yes' || input === 'y') {
            currentLocation.quitted = false;
            currentLocation = 'intro';
            // TODO clear inventory and put items back to their locations
            return 'OK. You scored ' + score + ' points.\nWelcome to Vots! Would you like instructions?\n\n';
        }
        else {
            return 'Please answer the question.\n\n';
        }
    }
    else if(input.split(' ').length >= 3) {
        return 'I only understand one and two word commands. Try commands like get key or drop shovel to interact with items and cardinal directions (north, south, east, west, ne, sw, ...) to move.\n\n';
    }
    else if(allDirections.includes(input)) {
        return move(input) + '\n';
    }
    else if(allVerbs.includes(input.split(' ')[0])) {
        let verb = input.split(' ')[0];
        let noun = input.split(' ').length > 1 ? input.split(' ')[1] : '';
        return takeAction(verb, noun) + '\n';
    }
    return dontKnowWord() + '\n\n';
}

// determine if the input is a direction and if it is a valid direction from the current location
function move(input) {
    if(input === 'back' || input === 'go back') {
        return 'I do not know everything. But one thing I do: forget what lies behind and strain to what lies ahead. In any case, "back" doesn\'t work.\n';
    }
    else {
        let currentConnections = currentLocation.connectingLocations;
        for(let i = 0; i < currentConnections.length; i++) {
            let directions = currentConnections[i].directions;
            let connectingLocation = currentConnections[i].location;
            // Update current location and previous location, print description
            if(directions.includes(input)) {
                currentLocation.visited = true;
                currentLocation = connectingLocation;
                return printLocation();
            }
            // You entered an invalid direction
            else if(i == currentConnections.length - 1) {
                if(input === 'in') {
                    return "You can't get in anything here.\n";
                }
                else if(input === 'out') {
                    return "You can't get out of anything here.\n";
                }
                else {
                    return "You can't go that way.\n";
                }
            }
        }
    }
}

// Call functions based on input
function takeAction(verb, input) {
    // Actions that work the same at every location
    if(verb === 'get' || verb === 'take') {
        if(input === '') {
            return verb === 'get' ? 'What do you want to get?\n' : 'What do you want to take?\n';
        }
        return get(input) + '\n';
    }
    else if(verb === 'drop' || verb === 'throw') {
        if(input === '') {
            return verb === 'drop' ? 'What do you want to drop?\n' : 'What do you want to throw?\n';
        }
        return drop(input) + '\n';
    }
    else if(verb === 'look') {
        return look();
    }
    else if(verb.length >= 5 && 'inventory'.startsWith(verb)) {
        return inven();
    }
    else if(verb === 'info') {
        return "If you want to end the game early, use the command \"quit\". There are trasures scattered throughout the mines and towns that miners left behind. The treasures will give you points while they are in your inventory, but to get full points for a treasure you must get it back to the shed. There is one mine per town. Some mines are accessable. Some are not. To see your score use the command \"score\". You lose points if you die. You only get three lives, so be careful out there. Good luck and have fun!\n";
    }
    else if(verb === 'help') {
        return "I know one and two word commands. I can interact with items and move places with cardinal directions (north, east, ne, etc.) and up/down. To interact with items you can use the verbs \"get\"/\"take\" and \"drop\"/\"throw\". There are other verbs that work for specfic items or at specific locations, such as a key that can only unlock a shed. When you visit a location for the first time you will see the long description, but any subsequent time you will see an abreviated description. To see the full description again use the command \"look\". You can take inventory with the command \"inventory\".\n";
    }

    // Actions that have affects at specific locations
    else if(verb === 'unlock') {
        if(input === '') {
            return 'What do you want to unlock?\n';
        }
        else if(input !== 'shed') {
            return "You can't unlock that.\n";
        }
        return unlock(input) + '\n';
    }
    else if(verb === 'open') {
        if(input === '') {
            return 'What do you want to open?\n';
        }
        else if(input !== 'shed') {
            return "You can't open that.\n";
        }
        return open(input);
    }
    else if(verb === 'shoot') {
        if(input === '') {
            return 'What do you want to shoot?\n';
        }
        // You can't shoot without a bow
        else if(!isItemInList('bow', inventory)) {
            return 'You have nothing to shoot with.\n';
        }
        // You can only shoot the arrow
        else if(isItemInList(input, inventory) && input !== 'arrow') {
            return "You can't shoot that.\n";
        }
        else if(!isItemInList(input, inventory)) {
            return "You don't have that.\n";
        }
        // Shoot the arrow
        else {
            return shoot(input) + '\n';
        }
    }
    else if(verb === 'turn') {
        if(input === '') {
            return 'What do you want to turn?\n';
        }
        // You can only turn the wheel that's at the dam
        else if(currentLocation.name !== 'dam') {
            return "There's nothing here to turn.\n";
        }
        else if(currentLocation.name === 'dam' && input !== 'wheel') {
            return "You can't turn that.\n";
        }
        else {
            return turn() + '\n';
        }
    }
    // Actions that works anywhere, but depends on what's in inventory and/or what's at the location
    else if(verb === 'fill') {
        if(input === '') {
            return 'What do you want to fill?\n';
        }
        return fill(input) + '\n';
    }
    else if(verb === 'solve') {
        if(input === '') {
            return 'What do you want to solve?\n';
        }
        else if(input !== 'cube') {
            return "You con't solve that.\n";
        }
        else if(input === 'cube' && !isItemInList(input, inventory)) {
            return "You don't have it.\n";
        }
        else {
            return solve(input) + '\n';
        }
    }
}

function itemsToString() {
    let retVal = '';    
    for(let i = 0; i < currentLocation.items.length; i++) {
        retVal += currentLocation.items[i].locationPrint + '\n';
    }
    return '\n' + retVal;
}

function dontKnowWord() {
    randomNum = Math.floor(Math.random() * 3);
    if(randomNum == 0) {
        return "I don't understand that.";
    }
    else if(randomNum == 1) {
        return 'What?';
    }
    else {
        return "I don't know that word.";
    }
}

// If location hasn't been visited, print full description, otherwise print short description
function printLocation() {
    return (currentLocation.visited ? currentLocation.shortDescription : currentLocation.description) + itemsToString();
}