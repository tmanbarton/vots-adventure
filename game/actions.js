function get(input) {
    let items = currentLocation.items;
    let itemToGet = getItemByName(input, items);
    // Corner case, you can only get gold if you have the jar
    if(input === 'gold' && !isItemInList('jar', inventory) && isItemInList('gold', items)) {
        return "You don't have anything to put the gold flakes in.";
    }
    else if(currentLocation.name === 'mine entrance' && input === 'nails' && !currentLocation.nailsOff) {
        // TODO implement dying
        return 'Are you sure you want to get the nails? The structure is very fragile and may fall apart and onto you.';
        // return 'OK. I warned you. You walk up to the wooden supports and start to remove the loose nails and, before you can even get them out, there is a loud crack and the support you were working on snaps and the ceiling comes crashing down on top of you. Unfortunately being crushed by a mountain and old wood is very dangerous, thus this decision has cost you your life.';
    }
    // Corner case, try to get magnet on dam after dropping it
    else if(input === 'magnet' && currentLocation.name === 'dam' && currentLocation.magnetDropped) {
        return 'The magnet will not budge. You cannot get it off the wheel.';
    }
    else if(isItemInList(input, items)) {
        // Corner case, change granite room description after taking cube for the first time.
        if(input === 'cube' && currentLocation.name == 'granite room' && !currentLocation.cubeTaken) {
            currentLocation.cubeTaken = true;
            currentLocation.description = 'There is a polished granite pedestal, black as night, in the middle of this room with walls of the same black rock.';
        }
        addItem(inventory, itemToGet);
        removeItem(items, items.indexOf(itemToGet));
        score += itemToGet.points;
        // Different print when you get gold vs. everything else
        return input === 'gold' ? 'The jar is now full of gold flakes.' : 'OK';
    }
    else if(isItemInList(input, inventory)) {
        return "You're already carrying it.";
    }
    return "I see no " + input + ' here.';
}

function drop(input) {
    let items = currentLocation.items;
    let itemToDrop = getItemByName(input, inventory);
    // Corner case, you lose item if you're in the boat
    if(currentLocation.name === 'boat') {
        if(input === 'jar' && isItemInList('gold', inventory)) {
            loseItem(getItemByName('gold', inventory));
            loseItem(getItemByName(input, inventory));
            return 'Your jar and gold splash into the water next to the boat and sinks to the bottom, never to be found again.';
        }
        loseItem(itemToDrop);
        return 'Your ' + itemToDrop.name + ' splashes into the water next to the boat and sinks to the bottom, never to be found again.';
    }
    else if(isItemInList(input, inventory)) {
        // Corner case, you drop both the gold and jar if you 'drop jar' when gold and jar are in inventory
        if(input === 'jar' && isItemInList('gold', inventory)) {
            let gold_item = getItemByName('gold', inventory);
            addItem(items, gold_item);
            removeItem(inventory, inventory.indexOf(gold_item));
        }
        // Corner case, you drop magnet at dam and it snaps to the wheel
        if(input === 'magnet' && currentLocation.name === 'dam') {
            removeItem(inventory, inventory.indexOf(itemToDrop));
            currentLocation.magnetDropped = true;
            currentLocation.description = "You're on a short dam that looks like it created this lake by stopping up a large river. The dam goes north and south along the west end of the lake. Close by is a wheel with its axel extending deep into the dam. Its orange metal is fading to rust except for some other metal at the center, shining in the sun. There's a large magnet stuck to this part of the wheel. South leads around the lake and to the north there's a set of stairs.";
            return "You drop the magnet and as it's falling it snaps to the shiny center of the wheel. You can hear some mechanical clicking somewhere inside the dam.";
        }
        // All is normal and good
        addItem(items, itemToDrop);
        removeItem(inventory, inventory.indexOf(itemToDrop));
        return 'OK';
    }
    return "You're not carrying it.";
}

function look() {
    return currentLocation.description + itemsToString();
}

function inven() {
    let retVal = '';
    if(inventory.length === 0) {
        return "You aren't carrying anything!\n";
    }
    for(let i = 0; i < inventory.length; i++) {
        retVal += inventory[i].inventoryPrint + '\n';
    }
    return "You're carrying the following:\n" + retVal;
}

function fill(input) {
    // Don't have jar
    if(!isItemInList(input, inventory)) {
        return "You don't have that.";
    }
    // Try to fill something else other than jar
    else if(isItemInList(input, inventory) && input !== 'jar') {
        return "You can't fill that.";
    }
    // Can only fill the jar
    else if(isItemInList('gold', currentLocation.items)) {
        get('gold');
        return 'The jar is now full of gold flakes.';
    }
    // No gold at location, can't fill jar
    else {
        return "There's nothing here to fill the jar with.";
    }
}

function unlock(input) {
    // Can only unlock shed
    if(currentLocation.name === 'shed') {
        if(currentLocation.unlocked) {
            return 'The shed is already unlocked!';
        }
        else {
            let keyInInventory = isItemInList('key', inventory);
            // Can't unlock without key
            if(!keyInInventory) {
                return 'You need a key to unlock the shed.';
            }
            // Unlock the shed and change descriptions
            else {
                currentLocation.unlocked = true;
                currentLocation.description = "A cheerful little shed stands with it's lock hanging open with a picnic table to the north.";
                currentLocation.shortDescription = "You're standing before a cheerful little, unlocked shed.";
                return 'The shed is now unlocked';
            }
        }
    }
    return 'There is nothing here to unlock.';
}

function open(input) {
    // Can only open shed
    if(currentLocation.name === 'shed') {
        if(currentLocation.opened) {
            return 'The shed is already open!\n';
        }
        // Can only open if it's been unlocked
        else if(!currentLocation.unlocked) {
            return 'You must unlock shed shed before opening it.\n';
        }
        // Open shed. Shed contains several items, add those to the location and update descriptions
        else {
            let items = currentLocation.items;
            currentLocation.opened = true;
            currentLocation.description = 'You stand before an open shed with a picnic table to the north.';
            items.push(hammer);
            items.push(bow);
            items.push(arrow);
            items.push(jar);
            items.push(shovel);
            items.push(tent);
            items.sort((a, b) => {
                return a.order - b.order;
            });

            return printLocation();
        }
    }
    return "There's nothing here to open.\n";
}

function shoot(input) {
    arrowItem = getItemByName(input, inventory);
    // Corner case, nock nails off when at mine entrance, add nails to location
    if(currentLocation.name === 'mine entrance') {
        if(!currentLocation.nailsOff) {
            currentLocation.connectingLocations.splice(1, 1);
            currentLocation.connectingLocations.splice(1, 1);
            let nails = {order: 12, locationPrint: 'There are some nails scattered on the ground here.', inventoryPrint: 'Some nails', name: 'nails'};
            addItem(currentLocation.items, nails);
            removeItem(inventory, inventory.indexOf(arrowItem));
            currentLocation.nailsOff = true;
            currentLocation.description = "You've come to the entrance to an abandoned gold mine that recently caved in, leaving no way to enter. Piles of tailings are all over with one path away from the entrance to the north.";
            addItem(currentLocation.items, arrowItem);
            removeItem(inventory, inventory.indexOf(arrowItem));
            return "You shoot the arrow and the nails go flying off with a small ringing sound as your arrow glances off of them. The nails and your arrow land a short distance away, followed by a loud crack as the support and the entrance collapse with an even louder crash and cloud of dust. Good thing you didn't try to take the nails by hand.";
        }
    }
    // Corner case, lose arrow at boat
    else if(currentLocation.name === 'boat') {
        removeItem(inventory, inventory.indexOf(arrowItem));
        return 'Your arrow goes flying off into the the distance and splashes into the water, never to be found again.';
    }
    addItem(currentLocation.items, arrowItem);
    removeItem(inventory, inventory.indexOf(arrowItem));
    return "Your arrow goes flying off into the distance and lands with a soft thud in the ground.";
}

function turn() {
    // You can only turn the wheel if the magnet has been dropped at the dam
    if(!currentLocation.magnetDropped) {
        return "The wheel is locked firmly in place.";
    }
    // Turn the wheel
    else {
        dam.connectingLocations.push({ directions: west, location: lakeTown });
        dam.connectingLocations.push({ directions: down, location: lakeTown });
        dam.description = "You're on a short dam on the east end of an empty lake. Close by is a wheel with its axel extending deep into the dam. Its orange metal has faded to rust except for some different metal at the center, shining in the sun. There's a large magnet stuck to this part of the wheel. South leads around the lake and to the north there's a set of stairs.";
        tailings.description = "All around are piles of tailings that look like they have been puked into this valley. There's not much else to be seen except the entrance to a mine to the south. There's a path leading to the east and another to the north.";
        intersection.description = "You have reached an intersection in the road. It leads into the forest to the north and west. The southern road goes into a thinner part of the forest.";
        driveway.description = "You are at the west end of a dirt road surrounded by a forest of pine trees. There is a small gap to the north that exposes a steep, dirt driveway sloping down into the forest. Looking down the road to the east you can see over the trees and into the valley. There's also a foot path going northwest.";
        lake.description = "You are on the south side of an empty lake. There's a path going west and there's a dam to the north.";
        return "The ground starts to rumble and you see a massive concrete wall start to rise out of the water on the opposite side of the lake, blocking the flow of water from the river into the lake. There's another shudder and a huge whirl pool near the middle of the lake and the water level starts going down. Soon the water is completely gone, revealing a town that had been under water only a few minutes ago. You can probably get to the town if you go down the dam to the west.";
    }
}

function solve(input) {
    if(!isItemInList(input, inventory)) {
        return "You don't have that.";
    }
    else {
        if(input !== 'cube') {
            return "That's not something you can solve.";
        }
        else {
            cube.solving = true;
            return "            ______\n           |      |\n           |   U  |\n     ______|______|______ ______\n    |      |      |      |      |\n    |   L  |   F  |   R  |   B  |\n    |______|______|______|______|\n           |      |\n           |   D  |\n           |______|\nf - front clockwise\nr' - right counterclockwise\nd2 - down 180 degrees\nx - r but rotate whole cube\ny' - u' but turn whole cube\nz - f but turn whole cube\nm - l but only middle layer\ne' - u' but only middle layer\ns - f but only middle layer\n\n" + cubeToString();
        }
    }
}

// Helpers

// list will be either currentLocation.items or inventory.
// This will never return null because I check if the list contains the item before I call the necessary funciton in this file
function getItemByName(name, list) {
    for(let i = 0; i < list.length; i++) {
        if(list[i].name === name) {
            return list[i];
        }
    }
    return null;
}

// Add the item to either currentLocation.items or inventory then sort the list by the order attribute
function addItem(list, item) {
    list.push(item);
    list.sort((a, b) => {
        return a.order - b.order;
    });
}

function removeItem(list, index) {
    list.splice(index, 1);
}

function isItemInList(itemName, list) {
    for(let i = 0; i < list.length; i++) {
        if(list[i].name === itemName) {
            return true;
        }
    }
    return false;
}

// Always lose from inventory
function loseItem(item) {
    removeItem(inventory, inventory.indexOf(item));
}