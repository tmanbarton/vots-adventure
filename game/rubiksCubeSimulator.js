function scrambleCube() {
    return algorithm = generateAlgorithm();
}

function executeTurn(turn) {
    switch(turn) {
        case 'help':
        case 'h':
            return "            ______\n           |      |\n           |   U  |\n     ______|______|______ ______\n    |      |      |      |      |\n    |   L  |   F  |   R  |   B  |\n    |______|______|______|______|\n           |      |\n           |   D  |\n           |______|\nf - front clockwise\nr' - right counterclockwise\nd2 - down 180 degrees\nx - r but rotate whole cube\ny' - u' but turn whole cube\nz - f but turn whole cube\nm - l but only middle layer\ne' - u' but only middle layer\ns - f but only middle layer";
        case 'r':
        case "r'":
        case 'r2':
            rightTurn(turn);
            break;
        case 'l':
        case "l'":
        case 'l2':
            leftTurn(turn);
            break;
        case 'f':
        case "f'":
        case 'f2':
            frontTurn(turn);
            break;
        case 'b':
        case "b'":
        case 'b2':
            backTurn(turn);
            break;
        case 'u':
        case "u'":
        case 'u2':
            upTurn(turn);
            break;
        case 'd':
        case "d'":
        case 'd2':
            downTurn(turn);
            break;
        case 'x':
        case "x'":
        case 'x2':
            xTurn(turn);
            break;
        case 'y':
        case "y'":
        case 'y2':
            yTurn(turn);
            break;
        case 'z':
        case "z'":
        case 'z2':
            zTurn(turn);
            break;
        default:
            return "That isn't a side you can turn.";
    }
}

function rightTurn(turn) {
    temp = '';
    let u = cube.cubeState[0];
    let f = cube.cubeState[1];
    let r = cube.cubeState[2];
    let b = cube.cubeState[3];
    let d = cube.cubeState[5];

    if(turn === 'r') {
        temp = f[2]; f[2] = d[2]; d[2] = b[6]; b[6] = u[2]; u[2] = temp;
        temp = f[5]; f[5] = d[5]; d[5] = b[3]; b[3] = u[5]; u[5] = temp;
        temp = f[8]; f[8] = d[8]; d[8] = b[0]; b[0] = u[8]; u[8] = temp;
        temp = r[0]; r[0] = r[6]; r[6] = r[8]; r[8] = r[2]; r[2] = temp;
        temp = r[1]; r[1] = r[3]; r[3] = r[7]; r[7] = r[5]; r[5] = temp;
    }
    else if(turn === "r'") {
        temp = f[2]; f[2] = u[2]; u[2] = b[6]; b[6] = d[2]; d[2] = temp;
        temp = f[5]; f[5] = u[5]; u[5] = b[3]; b[3] = d[5]; d[5] = temp;
        temp = f[8]; f[8] = u[8]; u[8] = b[0]; b[0] = d[8]; d[8] = temp;
        temp = r[0]; r[0] = r[2]; r[2] = r[8]; r[8] = r[6]; r[6] = temp;
        temp = r[1]; r[1] = r[5]; r[5] = r[7]; r[7] = r[3]; r[3] = temp;
    }
    else if(turn === 'r2') {
        temp = u[2]; u[2] = d[2]; d[2] = temp; temp = u[5]; u[5] = d[5]; d[5] = temp; temp = u[8]; u[8] = d[8]; d[8] = temp;
        temp = f[2]; f[2] = b[6]; b[6] = temp; temp = f[5]; f[5] = b[3]; b[3] = temp; temp = f[8]; f[8] = b[0]; b[0] = temp;
        temp = r[0]; r[0] = r[8]; r[8] = temp;
        temp = r[1]; r[1] = r[7]; r[7] = temp;
        temp = r[2]; r[2] = r[6]; r[6] = temp;
        temp = r[3]; r[3] = r[5]; r[5] = temp;
    }
}

function leftTurn(turn) {
    let temp = '';
    let u = cube.cubeState[0];
    let f = cube.cubeState[1];
    let b = cube.cubeState[3];
    let l = cube.cubeState[4];
    let d = cube.cubeState[5];

    if(turn === 'l') {
        temp = f[0]; f[0] = u[0]; u[0] = b[8]; b[8] = d[0]; d[0] = temp;
        temp = f[3]; f[3] = u[3]; u[3] = b[5]; b[5] = d[3]; d[3] = temp;
        temp = f[6]; f[6] = u[6]; u[6] = b[2]; b[2] = d[6]; d[6] = temp;
        temp = l[0]; l[0] = l[6]; l[6] = l[8]; l[8] = l[2]; l[2] = temp;
        temp = l[1]; l[1] = l[3]; l[3] = l[7]; l[7] = l[5]; l[5] = temp;
    }
    else if(turn === "l'") {
        temp = f[0]; f[0] = d[0]; d[0] = b[8]; b[8] = u[0]; u[0] = temp;
        temp = f[3]; f[3] = d[3]; d[3] = b[5]; b[5] = u[3]; u[3] = temp;
        temp = f[6]; f[6] = d[6]; d[6] = b[2]; b[2] = u[6]; u[6] = temp;
        temp = l[0]; l[0] = l[2]; l[2] = l[8]; l[8] = l[6]; l[6] = temp;
        temp = l[1]; l[1] = l[5]; l[5] = l[7]; l[7] = l[3]; l[3] = temp;
    }
    else if(turn === 'l2') {
        temp = u[0]; u[0] = d[0]; d[0] = temp; temp = u[3]; u[3] = d[3]; d[3] = temp; temp = u[6]; u[6] = d[6]; d[6] = temp;
        temp = f[0]; f[0] = b[8]; b[8] = temp; temp = f[3]; f[3] = b[5]; b[5] = temp; temp = f[6]; f[6] = b[2]; b[2] = temp;
        temp = l[0]; l[0] = l[8]; l[8] = temp;
        temp = l[1]; l[1] = l[7]; l[7] = temp;
        temp = l[2]; l[2] = l[6]; l[6] = temp;
        temp = l[3]; l[3] = l[5]; l[5] = temp;
    }
}

function frontTurn(turn) {
    let temp = '';
    let u = cube.cubeState[0];
    let f = cube.cubeState[1];
    let r = cube.cubeState[2];
    let l = cube.cubeState[4];
    let d = cube.cubeState[5];
    if(turn === 'f') {
        temp = u[6]; u[6] = l[8]; l[8] = d[2]; d[2] = r[0]; r[0] = temp;
        temp = u[7]; u[7] = l[5]; l[5] = d[1]; d[1] = r[3]; r[3] = temp;
        temp = u[8]; u[8] = l[2]; l[2] = d[0]; d[0] = r[6]; r[6] = temp;
        temp = f[0]; f[0] = f[6]; f[6] = f[8]; f[8] = f[2]; f[2] = temp;
        temp = f[1]; f[1] = f[3]; f[3] = f[7]; f[7] = f[5]; f[5] = temp;
    }
    else if(turn === "f'") {
        temp = u[6]; u[6] = r[0]; r[0] = d[2]; d[2] = l[8]; l[8] = temp;
        temp = u[7]; u[7] = r[3]; r[3] = d[1]; d[1] = l[5]; l[5] = temp;
        temp = u[8]; u[8] = r[6]; r[6] = d[0]; d[0] = l[2]; l[2] = temp;
        temp = f[0]; f[0] = f[2]; f[2] = f[8]; f[8] = f[6]; f[6] = temp;
        temp = f[1]; f[1] = f[5]; f[5] = f[7]; f[7] = f[3]; f[3] = temp;
    }
    else if(turn === 'f2') {
        temp = u[6]; u[6] = d[2]; d[2] = temp; temp = u[7]; u[7] = d[1]; d[1] = temp; temp = u[8]; u[8] = d[0]; d[0] = temp;
        temp = l[2]; l[2] = r[6]; r[6] = temp; temp = l[5]; l[5] = r[3]; r[3] = temp; temp = l[8]; l[8] = r[0]; r[0] = temp;
        temp = f[0]; f[0] = f[8]; f[8] = temp;
        temp = f[1]; f[1] = f[7]; f[7] = temp;
        temp = f[2]; f[2] = f[6]; f[6] = temp;
        temp = f[3]; f[3] = f[5]; f[5] = temp;
    }
}

function backTurn(turn) {
    let temp = '';
    let u = cube.cubeState[0];
    let r = cube.cubeState[2];
    let b = cube.cubeState[3];
    let l = cube.cubeState[4];
    let d = cube.cubeState[5];
    if(turn === 'b') {
        temp = u[0]; u[0] = r[2]; r[2] = d[8]; d[8] = l[6]; l[6] = temp;
        temp = u[1]; u[1] = r[5]; r[5] = d[7]; d[7] = l[3]; l[3] = temp;
        temp = u[2]; u[2] = r[8]; r[8] = d[6]; d[6] = l[0]; l[0] = temp;
        temp = b[8]; b[8] = b[2]; b[2] = b[0]; b[0] = b[6]; b[6] = temp;
        temp = b[7]; b[7] = b[5]; b[5] = b[1]; b[1] = b[3]; b[3] = temp;
    }
    else if(turn === "b'") {
        temp = u[0]; u[0] = l[6]; l[6] = d[8]; d[8] = r[2]; r[2] = temp;
        temp = u[1]; u[1] = l[3]; l[3] = d[7]; d[7] = r[5]; r[5] = temp;
        temp = u[2]; u[2] = l[0]; l[0] = d[6]; d[6] = r[8]; r[8] = temp;
        temp = b[8]; b[8] = b[6]; b[6] = b[0]; b[0] = b[2]; b[2] = temp;
        temp = b[7]; b[7] = b[3]; b[3] = b[1]; b[1] = b[5]; b[5] = temp;
    }
    else if(turn === 'b2') {
        temp = u[0]; u[0] = d[8]; d[8] = temp; temp = u[1]; u[1] = d[7]; d[7] = temp; temp = u[2]; u[2] = d[6]; d[6] = temp;
        temp = l[0]; l[0] = r[8]; r[8] = temp; temp = l[3]; l[3] = r[5]; r[5] = temp; temp = l[6]; l[6] = r[2]; r[2] = temp;
        temp = b[0]; b[0] = b[8]; b[8] = temp;
        temp = b[1]; b[1] = b[7]; b[7] = temp;
        temp = b[2]; b[2] = b[6]; b[6] = temp;
        temp = b[3]; b[3] = b[5]; b[5] = temp;
    }
}

function upTurn(turn) {
    let temp = '';
    let u = cube.cubeState[0];
    let f = cube.cubeState[1];
    let r = cube.cubeState[2];
    let b = cube.cubeState[3];
    let l = cube.cubeState[4];
    if(turn === 'u') {
        temp = f[0]; f[0] = r[0]; r[0] = b[0]; b[0] = l[0]; l[0] = temp;
        temp = f[1]; f[1] = r[1]; r[1] = b[1]; b[1] = l[1]; l[1] = temp;
        temp = f[2]; f[2] = r[2]; r[2] = b[2]; b[2] = l[2]; l[2] = temp;
        temp = u[0]; u[0] = u[6]; u[6] = u[8]; u[8] = u[2]; u[2] = temp;
        temp = u[1]; u[1] = u[3]; u[3] = u[7]; u[7] = u[5]; u[5] = temp;
    }
    else if(turn === "u'") {
        temp = f[0]; f[0] = l[0]; l[0] = b[0]; b[0] = r[0]; r[0] = temp;
        temp = f[1]; f[1] = l[1]; l[1] = b[1]; b[1] = r[1]; r[1] = temp;
        temp = f[2]; f[2] = l[2]; l[2] = b[2]; b[2] = r[2]; r[2] = temp;
        temp = u[0]; u[0] = u[2]; u[2] = u[8]; u[8] = u[6]; u[6] = temp;
        temp = u[1]; u[1] = u[5]; u[5] = u[7]; u[7] = u[3]; u[3] = temp;
    }
    else if(turn === 'u2') {
        temp = f[0]; f[0] = b[0]; b[0] = temp; temp = f[1]; f[1] = b[1]; b[1] = temp; temp = f[2]; f[2] = b[2]; b[2] = temp;
        temp = l[0]; l[0] = r[0]; r[0] = temp; temp = l[1]; l[1] = r[1]; r[1] = temp; temp = l[2]; l[2] = r[2]; r[2] = temp;
        temp = u[0]; u[0] = u[8]; u[8] = temp;
        temp = u[1]; u[1] = u[7]; u[7] = temp;
        temp = u[2]; u[2] = u[6]; u[6] = temp;
        temp = u[3]; u[3] = u[5]; u[5] = temp;
    }
}

function downTurn(turn) {
    let temp = '';
    let f = cube.cubeState[1];
    let r = cube.cubeState[2];
    let b = cube.cubeState[3];
    let l = cube.cubeState[4];
    let d = cube.cubeState[5];
    if(turn === 'd') {
        temp = l[6]; l[6] = b[6]; b[6] = r[6]; r[6] = f[6]; f[6] = temp;
        temp = l[7]; l[7] = b[7]; b[7] = r[7]; r[7] = f[7]; f[7] = temp;
        temp = l[8]; l[8] = b[8]; b[8] = r[8]; r[8] = f[8]; f[8] = temp;
        temp = d[0]; d[0] = d[6]; d[6] = d[8]; d[8] = d[2]; d[2] = temp;
        temp = d[1]; d[1] = d[3]; d[3] = d[7]; d[7] = d[5]; d[5] = temp;
    }
    else if(turn === "d'") {
        temp = l[6]; l[6] = f[6]; f[6] = r[6]; r[6] = b[6]; b[6] = temp;
        temp = l[7]; l[7] = f[7]; f[7] = r[7]; r[7] = b[7]; b[7] = temp;
        temp = l[8]; l[8] = f[8]; f[8] = r[8]; r[8] = b[8]; b[8] = temp;
        temp = d[0]; d[0] = d[2]; d[2] = d[8]; d[8] = d[6]; d[6] = temp;
        temp = d[1]; d[1] = d[5]; d[5] = d[7]; d[7] = d[3]; d[3] = temp;
    }
    else if(turn === 'd2') {
        temp = f[6]; f[6] = b[6]; b[6] = temp; temp = f[7]; f[7] = b[7]; b[7] = temp; temp = f[8]; f[8] = b[8]; b[8] = temp;
        temp = l[6]; l[6] = r[6]; r[6] = temp; temp = l[7]; l[7] = r[7]; r[7] = temp; temp = l[8]; l[8] = r[8]; r[8] = temp;
        temp = d[0]; d[0] = d[8]; d[8] = temp;
        temp = d[1]; d[1] = d[7]; d[7] = temp;
        temp = d[2]; d[2] = d[6]; d[6] = temp;
        temp = d[3]; d[3] = d[5]; d[5] = temp;
    }
}

function xTurn(turn) {
    let temp = '';
    let u = cube.cubeState[0];
    let f = cube.cubeState[1];
    let b = cube.cubeState[3];
    let d = cube.cubeState[4];
    if(turn === 'x') {
        rightTurn('r');
        leftTurn("l'");
        temp = u[1]; u[1] = f[1]; f[1] = d[1]; d[1] = b[7]; b[7] = temp;
        temp = u[4]; u[4] = f[4]; f[4] = d[4]; d[4] = b[4]; b[4] = temp;
        temp = u[7]; u[7] = f[7]; f[7] = d[7]; d[7] = b[1]; b[1] = temp;
    }
    else if(turn === "x'") {
        rightTurn("r'");
        leftTurn('l');
        temp = u[1]; u[1] = b[7]; b[7] = d[1]; d[1] = f[1]; f[1] = temp;
        temp = u[4]; u[4] = b[4]; b[4] = d[4]; d[4] = f[4]; f[4] = temp;
        temp = u[7]; u[7] = b[1]; b[1] = d[7]; d[7] = f[7]; f[7] = temp;
    }
    else if(turn === 'x2') {
        rightTurn('r2');
        leftTurn('l2');
        temp = u[1]; u[1] = d[1]; d[1] = temp; temp = u[4]; u[4] = d[4]; d[4] = temp; temp = u[7]; u[7] = d[7]; d[7] = temp;
        temp = f[1]; f[1] = b[7]; b[7] = temp; temp = f[4]; f[4] = b[4]; b[4] = temp; temp = f[7]; f[7] = b[1]; b[1] = temp;
    }
}

function yTurn(turn) {
    let temp = '';
    let f = cube.cubeState[1];
    let r = cube.cubeState[2];
    let b = cube.cubeState[3];
    let l = cube.cubeState[4];
    if(turn === 'y') {
        upTurn('U');
        downTurn("d'");
        temp = f[3]; f[3] = r[3]; r[3] = b[3]; b[3] = l[3]; l[3] = temp;
        temp = f[4]; f[4] = r[4]; r[4] = b[4]; b[4] = l[4]; l[4] = temp;
        temp = f[5]; f[5] = r[5]; r[5] = b[5]; b[5] = l[5]; l[5] = temp;
    }
    else if(turn === "y'") {
        upTurn("u'");
        downTurn('d');
        temp = f[3]; f[3] = l[3]; l[3] = b[3]; b[3] = r[3]; r[3] = temp;
        temp = f[4]; f[4] = l[4]; l[4] = b[4]; b[4] = r[4]; r[4] = temp;
        temp = f[5]; f[5] = l[5]; l[5] = b[5]; b[5] = r[5]; r[5] = temp;
    }
    else if(turn === 'y2') {
        upTurn('U2');
        downTurn('d2');
        temp = f[3]; f[3] = b[3]; b[3] = temp; temp = f[4]; f[4] = b[4]; b[4] = temp; temp = f[5]; f[5] = b[5]; b[5] = temp;
        temp = l[3]; l[3] = r[3]; r[3] = temp; temp = l[4]; l[4] = r[4]; r[4] = temp; temp = l[5]; l[5] = r[5]; r[5] = temp;
    }
}

function zTurn(turn) {
    let temp;
    let u = cube.cubeState[0];
    let r = cube.cubeState[2];
    let l = cube.cubeState[4];
    let d = cube.cubeState[5];
    if(turn === 'z') {
        frontTurn("f'");
        backTurn('b');
        temp = u[3]; u[3] = l[7]; l[7] = d[5]; d[5] = r[1]; r[1] = temp;
        temp = u[4]; u[4] = l[4]; l[4] = d[4]; d[4] = r[4]; r[4] = temp;
        temp = u[5]; u[5] = l[1]; l[1] = d[3]; d[3] = r[7]; r[7] = temp;
    }
    else if(turn === "z'") {
        frontTurn('f');
        backTurn("b'");
        temp = u[3]; u[3] = r[1]; r[1] = d[5]; d[5] = l[7]; l[7] = temp;
        temp = u[4]; u[4] = r[4]; r[4] = d[4]; d[4] = l[4]; l[4] = temp;
        temp = u[5]; u[5] = r[7]; r[7] = d[3]; d[3] = l[1]; l[1] = temp;
    }
    else if(turn === 'z2') {
        frontTurn('f2');
        backTurn('b2');
        temp = u[3]; u[3] = d[5]; d[5] = temp; temp = u[4]; u[4] = d[4]; d[4] = temp; temp = u[5]; u[5] = d[3]; d[3] = temp;
        temp = l[1]; l[1] = r[7]; r[7] = temp; temp = l[4]; l[4] = r[4]; r[4] = temp; temp = l[7]; l[7] = r[1]; r[1] = temp;
    }
}

function generateAlgorithm() {
    // Array of random ints. Length determines number of turns in scramble algorithm
    let randomInts = new Array(5);
    // Number to be added to array if conditions are met
    for(let i = 0; i < randomInts.length; i++) {
        // Generate random number between 1 and 18
        let randomNumber = Math.floor(Math.random() * 18) + 1;
        // Continue if it's the same number as previous
        if(i != 0 && randomNumber == randomInts[i - 1]) {
            i--;
            continue;
        }
        // Continue if current is U, U', or U2 and previous one is either U U' U2 or previous two are any of UD U'D U2D U'D U'D' U2D' UD2 U'D2 U2D2
        else if(i != 0 && (randomNumber == 1 || randomNumber == 2 || randomNumber == 3) && ((randomInts[i - 1] == 1 || randomInts[i - 1] == 2 || randomInts[i - 1] == 3)
                || (i != 1 && (randomInts[i - 2] == 1 || randomInts[i - 2] == 2 || randomInts[i - 2] == 3) && (randomInts[i - 1] == 16 || randomInts[i - 1] == 17 || randomInts[i - 1] == 18)))) {
            i--;
            continue;
        }
        // Continue if current is F, F' or F2 and previous one is either F F' F2 or previous two are any of FB F'B F2B FB' F'B' F2B' FB2 F'B2 F2B2
        else if(i != 0 && (randomNumber == 4 || randomNumber == 5 || randomNumber == 6) && ((randomInts[i - 1] == 4 || randomInts[i - 1] == 5 || randomInts[i - 1] == 6)
                || (i != 1 && (randomInts[i - 2] == 4 || randomInts[i - 2] == 5 || randomInts[i - 2] == 6) && (randomInts[i - 1] == 10 || randomInts[i - 1] == 11 || randomInts[i - 1] == 12)))) {
            i--;
            continue;
        }
        // Continue if current is R, R' or R2 and previous one is either R R' R2 or previous two are any of RL R'L R2L RL' R'L' R2L' RL2 R'L2 R2L2
        else if(i != 0 && (randomNumber == 7 || randomNumber == 8 || randomNumber == 9) && ((randomInts[i - 1] == 7 || randomInts[i - 1] == 8 || randomInts[i - 1] == 9)
                || (i != 1 && (randomInts[i - 2] == 7 || randomInts[i - 2] == 8 || randomInts[i - 2] == 9) && (randomInts[i - 1] == 13 || randomInts[i - 1] == 14 || randomInts[i - 1] == 15)))) {
            i--;
            continue;
        }
        // Continue if current is B, B' or B2 and previous one is either B B' B2 or previous two are any of BF B'F B2F BF' B'F' B2F' BF2 B'F2 B2F2
        else if(i != 0 && (randomNumber == 10 || randomNumber == 11 || randomNumber == 12) && ((randomInts[i - 1] == 10 || randomInts[i - 1] == 11 || randomInts[i - 1] == 12)
                || (i != 1 && (randomInts[i - 2] == 10 || randomInts[i - 2] == 11 || randomInts[i - 2] == 12) && (randomInts[i - 1] == 4 || randomInts[i - 1] == 5 || randomInts[i - 1] == 6)))) {
            i--;
            continue;
        }
        // Continue if current is L, L' or L2 and previous one is either L L' L2 or previous two are any of LR L'R L2R LR' L'R' L2R' LR2 L'R2 L2R2
        else if(i != 0 && (randomNumber == 13 || randomNumber == 14 || randomNumber == 15) && ((randomInts[i - 1] == 13 || randomInts[i - 1] == 14 || randomInts[i - 1] == 15)
                || (i != 1 && (randomInts[i - 2] == 13 || randomInts[i - 2] == 14 || randomInts[i - 2] == 15) && (randomInts[i - 1] == 7 || randomInts[i - 1] == 8 || randomInts[i - 1] == 9)))) {
            i--;
            continue;
        }
        // Continue if current is D, D' or D2 and previous one is either D D' D2 or previous two are any of DU D'U D2U DU' D'U' D2U' DU2 D'U2 D2U2
        else if(i != 0 && (randomNumber == 16 || randomNumber == 17 || randomNumber == 18) && ((randomInts[i - 1] == 16 || randomInts[i - 1] == 17 || randomInts[i - 1] == 18)
                || (i != 1 && (randomInts[i - 2] == 16 || randomInts[i - 2] == 17 || randomInts[i - 2] == 18) && (randomInts[i - 1] == 1 || randomInts[i - 1] == 2 || randomInts[i - 1] == 3)))) {
            i--;
            continue;
        }
        randomInts[i] = randomNumber;
    }
    algorithm = intArrayToString(randomInts);
    return algorithm;
}

// Turn each random number into a letter for the scramble
function intArrayToString(numbers) {
    scrambleAlg = [];
    for(let i = 0; i < numbers.length; i++) {
        switch(numbers[i]) {
            case 1:
                scrambleAlg.push('U');
                break;
            case 2:
                scrambleAlg.push("U'");
                break;
            case 3:
                scrambleAlg.push('U2');
                break;
            case 4:
                scrambleAlg.push('F');
                break;
            case 5:
                scrambleAlg.push("F'");
                break;
            case 6:
                scrambleAlg.push('F2');
                break;
            case 7:
                scrambleAlg.push('R');
                break;
            case 8:
                scrambleAlg.push("R'");
                break;
            case 9:
                scrambleAlg.push('R2');
                break;
            case 10:
                scrambleAlg.push('B');
                break;
            case 11:
                scrambleAlg.push("B'");
                break;
            case 12:
                scrambleAlg.push('B2');
                break;
            case 13:
                scrambleAlg.push('L');
                break;
            case 14:
                scrambleAlg.push("L'");
                break;
            case 15:
                scrambleAlg.push('L2');
                break;
            case 16:
                scrambleAlg.push('D');
                break;
            case 17:
                scrambleAlg.push("D'");
                break;
            case 18:
                scrambleAlg.push('D2');
                break;
        }
    }
    return scrambleAlg;
}

function cubeToString() {
    u = cube.cubeState[0];
    f = cube.cubeState[1];
    r = cube.cubeState[2];
    b = cube.cubeState[3];
    l = cube.cubeState[4];
    d = cube.cubeState[5];
    return '      ' + u[0] +  ' ' + u[1] + ' ' + u[2] +
'\n      ' + u[3] +  ' ' + u[4] + ' ' + u[5] +
'\n      ' + u[6] +  ' ' + u[7] + ' ' + u[8] +
'\n' + l[0] + ' ' + l[1] + ' ' + l[2] + ' ' + f[0] + ' ' + f[1] + ' ' + f[2] + ' ' + r[0] + ' ' + r[1] + ' ' + r[2] + ' ' + b[0] + ' ' + b[1] + ' ' + b[2] +
'\n' + l[3] + ' ' + l[4] + ' ' + l[5] + ' ' + f[3] + ' ' + f[4] + ' ' + f[5] + ' ' + r[3] + ' ' + r[4] + ' ' + r[5] + ' ' + b[3] + ' ' + b[4] + ' '+ b[5] +
'\n' + l[6] + ' ' + l[7] + ' ' + l[8] + ' ' + f[6] + ' ' + f[7] + ' ' + f[8] + ' ' + r[6] + ' ' + r[7] + ' ' + r[8] + ' ' + b[6] + ' ' + b[7] + ' '+ b[8] +
'\n      ' + d[0] +  ' ' + d[1] + ' ' + d[2] +
'\n      ' + d[3] +  ' ' + d[4] + ' ' + d[5] +
'\n      ' + d[6] +  ' ' + d[7] + ' ' + d[8];
}