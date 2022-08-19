// window.onresize = function() { location.reload(); }



let columns;
let rows;
let board;
let next;
let colorBar;
let widthBar;
let press = 0
let press2 = 0
let widthBarVal;
let speedBarVal;
let randomBarVal;
let inp
let inpVal;
let inp2
let inpVal2;

let timeBox;


let cellsTime = 0;



function setup() {
    const canvas = createCanvas(windowWidth - 90, windowHeight - 400);
    canvas.parent(document.querySelector('#canvas'));

    colorMode(HSB);
    colorBar = createSlider(0, 360, 360);
    colorBar.position(0, 0);
    colorBar.style('width', "350px");
    colorBar.parent('#color-bar');

    widthBar = createSlider(5, 30, 5);
    widthBar.position(0, 0);
    widthBar.style('width', "350px"); //'200px'
    widthBar.parent('#width-bar');

    speedBar = createSlider(1, 30, 15);
    speedBar.position(0, 0);
    speedBar.style('width', "350px"); //'200px'
    speedBar.parent('#speed-bar');


    randomBar = createSlider(0, 2, 0);
    randomBar.position(0, 0);
    randomBar.style('width', "350px"); //'200px'
    randomBar.parent('#random-bar');

    widthBarVal = widthBar.value()
    speedBarVal = speedBar.value()
    randomBarVal = randomBar.value()

    inp = createInput('2');
    inp.position(0, 0);
    inp.size(100);
    inp.parent('#inputBar')

    inp2 = createInput('3');
    inp2.position(0, 0);
    inp2.size(100);
    inp2.parent('#inputBar2')


    // Calculate columns and rows
    columns = floor(width / widthBarVal);
    rows = floor(height / widthBarVal);
    // Wacky way to make a 2D array is JS
    board = new Array(columns);
    for (let i = 0; i < columns; i++) {
        board[i] = new Array(rows);
    }
    // Going to use multiple 2D arrays and swap them
    next = new Array(columns);
    for (i = 0; i < columns; i++) {
        next[i] = new Array(rows);
    }

    init();
}



function draw() {
    colorBarVal = colorBar.value()
    widthBarVal = widthBar.value()
    speedBarVal = speedBar.value()



    background(90);
    // background(90);
    // rectMode(CENTER);
    // translate(0, 0);
    // translate(p5.Vector.fromAngle(millis() / 600, 40));


    generate();
    frameRate(speedBarVal)


    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            // cellsTime = cellsTime + deltaTime;


            // board[i][j] = { value: 0, time: cellsTime, state: 0 }


            // if (board[i][j].time > 2000) {
            //     board[i][j].state += 1;
            // }


            // if (board[i][j].state === 0) fill(255);
            // else if (board[i][j].state == 1) fill(colorBarVal, 100, colorBarVal, 1);
            // else if (board[i][j].state == 2) fill(colorBarVal - 100 + frameCount % 60, 100, colorBarVal - 100, 1)


            if (j < 40 && (board[i][j] == 1)) fill(colorBarVal, 100, colorBarVal, 1);
            else if (j > 40 && (board[i][j] == 1)) fill(colorBarVal - 100 + frameCount % 60, 100, colorBarVal - 100, 1);
            else if ((board[i][j - 1] == 1)) fill(0);
            else if ((board[i][j - 2] == 1)) fill(20);
            else if ((board[i][j - 3] == 1)) fill(40);
            else if ((board[i][j - 4] == 1)) fill(60);
            else if ((board[i][j - 5] == 1)) fill(80);
            else fill(90);
            // if ((board[i][j] == 1)) fill(colorBarVal, 100, colorBarVal, 1);
            // else fill(90);

            stroke(90);
            rect(i * widthBarVal, j * widthBarVal, widthBarVal - 1, widthBarVal - 1);
        }
    }



    // textSize(42);
    // // fill(0);
    // // timeBox = text(frameCount, 500, 780);

}


function windowResized() {
    noLoop()
    resizeCanvas(windowWidth, windowHeight);
    setup();
    loop();
}

// reset board when mouse is pressed

// function mousePressed() {
//     init();
// }

function mouseDragged() {
    let val = colorBar.value()
    let widthBarVal = widthBar.value()
        /**
         * If the mouse coordinate is outside the board
         */

    if (mouseX > widthBarVal * columns || mouseY > widthBarVal * rows) {
        return;
    }
    const x = Math.floor(mouseX / widthBarVal);
    const y = Math.floor(mouseY / widthBarVal);
    board[x][y] = 1;
    fill(val, 100, val, 1);
    stroke(80);
    rect(x * widthBarVal, y * widthBarVal, widthBarVal, widthBarVal);
}


/**
 * When mouse is pressed
 */
function mousePressed() {
    noLoop()
    mouseDragged();
}

/**
 * When mouse is released
 */
function mouseReleased() {
    loop()
}


function keyPressed() {
    let val = colorBar.value()
    let widthBarVal = widthBar.value()

    if (keyCode === 68) {
        noLoop()
        press += widthBarVal
    } else if (keyCode === 65) {
        noLoop()
        press -= widthBarVal
    } else if (keyCode === 87) {
        noLoop()
        press2 -= widthBarVal
    } else if (keyCode === 83) {
        noLoop()
        press2 += widthBarVal
    } else if (keyCode === 80) {
        noLoop()
    } else if (keyCode === 79) {
        loop()
    } else if (keyCode === ENTER) {
        loop()
        press = 0
        press2 = 0
    }

    if (press > widthBarVal * columns || press2 > widthBarVal * rows) {
        return;
    }

    const x = Math.floor(press / widthBarVal);
    const y = Math.floor(press2 / widthBarVal);
    board[x][y] = 1;

    fill(val, 100, val, 1);
    stroke(80);
    rect(x * widthBarVal, y * widthBarVal, widthBarVal, widthBarVal);
}



let pa = [
    'OO...................................',
    '.O...................................',
    '.O.O......O.............O............',
    '..OO......OOOO........O.O............',
    '...........OOOO......O.O.............',
    '...........O..O.....O..O.............',
    '...........OOOO......O.O.............',
    '..........OOOO........O.O........OO..',
    '..........O.............O........O.O.',
    '...................................O.',
    '...................................OO',
    '.....................................',
    '................OOO..................',
    '...............OO.OO.................',
    '...............OO.OO.................',
    '...............OOOOO.................',
    '..............OO...OO................',
    '.....................................',
    '.....................................',
    '.....................................',
    '.....................................',
    '.....................................',
    '.....................................',
    '..............OO.....................',
    '...............O.....................',
    '............OOO......................',
    '............O........................'

]

let pa4 = [
    '...........................O...........',
    '...........................OOOO........',
    '...........O................OOOO.......',
    '..........O.O.....OO........O..O.......',
    '...OO...OO...O..............OOOO.......',
    '...OO...OO...O....O.O.OO...OOOO........',
    '........OO...O.....OO...O..O...........',
    '..........O.O..........O...............',
    '...........O........O..O...............',
    '.......................................',
    '..........................O.O..........',
    '............................O..........',
    '........................O..............',
    '..........................O............',
    '.........................O.............',
    '.......................................',
    '...........OO..........................',
    '...........OO....O.....................',
    'OO......OO......OOOOO.OO...............',
    'OO.....OOO.....O..OO....O..............',
    '........OO.....OO........O............O',
    '...........OO....O.......O..........O.O',
    '...........OO............O...........OO',
    '........................O........OO....',
    '......................OO.........O.O...',
    '...................................O...',
    '...................................OO..'
]

let pa3 = [
    '..............................O............',
    '...............................O...........',
    '.........................O.....O...........',
    '....O.....................OOOOOO.....OOOOOO',
    '.....O..............................O.....O',
    'O....O....................................O',
    '.OOOOO..............................O....O.',
    '......................................OO...',
    '...........................................',
    '.....................................O.....',
    '....................................O......',
    '...................................OO...OO.',
    '...................................O.O...OO',
    '....................................O...OO.',
    '........................................O..',
    '...........................................',
    '........................................O..',
    '....................................O...OO.',
    '...................................O.O...OO',
    '...................................OO...OO.',
    '....................................O......',
    '.....................................O.....',
    '...........................................',
    '......................................OO...',
    '.OOOOO..............................O....O.',
    'O....O....................................O',
    '.....O..............................O.....O',
    '....O.....................OOOOOO.....OOOOOO',
    '.........................O.....O...........',
    '...............................O...........',
    '..............................O............'
]

let pa2 = [
    '.OOO......O.....O......OOO.',
    'O..O.....OOO...OOO.....O..O',
    '...O....OO.O...O.OO....O...',
    '...O...................O...',
    '...O..O.............O..O...',
    '...O..OO...........OO..O...',
    '..O...OO...........OO...O..'
]

let engineCorderShip = [
    '.............O..OO......O..OOO',
    '.....O...OOOO.OOOOOO....O..OOO',
    '.OOOOO....O....O....OOO.......',
    'O......OO.O......OO.OOO..O.OOO',
    '.OOOOO.OOO........OOOO...O.OOO',
    '.....O..O..............O......',
    '........OO..........OO.OO.....',
    '........OO..........OO.OO.....',
    '.....O..O..............O......',
    '.OOOOO.OOO........OOOO...O.OOO',
    'O......OO.O......OO.OOO..O.OOO',
    '.OOOOO....O....O....OOO.......',
    '.....O...OOOO.OOOOOO....O..OOO',
    '.............O..OO......O..OOO'
]

let bomber = [
    '.OO....................................',
    '.OO.................O..................',
    '...................O.O............O.O..',
    '....................O............O.....',
    'OO.......OO.......................O..O.',
    'OO.O.....OO.......................O.O.O',
    '...O.......................O.......O..O',
    '...O.......................OO.......OO.',
    'O..O.................OO.....O..........',
    '.OO..................O.................',
    '.....................OOO...............',
    '....................................OO.',
    '....................................OO.',
    '.OO....................................',
    'O..O...................................',
    'O.O.O................O.O....OO.....OO..',
    '.O..O.................OO....OO.....OO.O',
    '.....O............O...O...............O',
    '..O.O............O.O..................O',
    '..................O................O..O',
    '....................................OO.'
]


// Fill board randomly
function init() {
    randomBarVal = randomBar.value()

    let pattern = generatePattern(pa)
    let pattern2 = generatePattern(pa)
    let pattern3 = generatePattern(engineCorderShip)



    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {


            // // Lining the edges with 0s
            if (i == 0 || j == 0 || i == columns - 1 || j == rows - 1) board[i][j] = 0;
            // else if (i == 1 || j % 3 == 0) board[i][j] = 0;
            // else if (i == 300 && j == 200) board[i][j] = 1;
            // Filling the rest randomly
            else
                board[i][j] = floor(random(randomBarVal));
            next[i][j] = 0;
        }
    }


    // for (let i = 0; i < columns; i++) {
    //     for (let j = 0; j < rows; j++) {
    //         // Lining the edges with 0s
    //         if (i == 0 || j == 0 || i == columns - 1 || j == rows - 1) board[i][j] = 0;
    //         else if (i == 400 || j == 500 || i == columns - 1 || j == rows - 1) board[i][j] = 1;
    //         else if (i == 1 || j % 2 == 0) board[i][j] = 1;
    //         // else if (i == 1 || j % 3 == 0) board[i][j] = 0;
    //         // else if (i == 300 && j == 200) board[i][j] = 1;
    //         // Filling the rest randomly
    //         else board[i][j] = floor(random(0));
    //         next[i][j] = 0;
    //     }
    // }

    drawPattern(pattern, 20, 50)
    drawPattern(pattern2, 20, 10)

    if (windowWidth > 700) {
        drawPattern(pattern3, 100, 10)
    }

    frameCount = 0

}


function drawPattern(pattern, x, y) {
    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
            if (pattern[i][j] === 0) board[j + x][i + y] = 0;
            else board[j + x][i + y] = 1;
        }
    }
}


function generatePattern(str) {
    let result = [];

    for (let i = 0; i < str.length; i++) {
        let p = []
        for (let j = 0; j < str[i].length; j++) {
            if (str[i][j] == "O") {
                p.push(1)
            } else if (str[i][j] == ".") {
                p.push(0)
            }
        }
        result.push(p)

    }

    return result
}


// The process of creating the new generation
function generate() {
    inpVal = inp.value()
    inpVal2 = inp2.value()


    // Loop through every spot in our 2D array and check spots neighbors
    for (let x = 1; x < columns - 1; x++) {
        for (let y = 1; y < rows - 1; y++) {
            // Add up all the states in a 3x3 surrounding grid
            let neighbors = 0;

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    neighbors += board[x + i][y + j];
                }
            }
            // A little trick to subtract the current cell's state since
            // we added it in the above loop
            neighbors -= board[x][y];
            // Rules of Life

            if ((board[x][y] == 1) && (neighbors < inpVal)) next[x][y] = 0; // Loneliness
            else if ((board[x][y] == 1) && (neighbors > inpVal2)) next[x][y] = 0; // Overpopulation
            else if ((board[x][y] == 0) && (neighbors == inpVal2)) next[x][y] = 1; // Reproduction
            else next[x][y] = board[x][y]; // Stasis

        }
    }

    // Swap!
    let temp = board;
    board = next;
    next = temp;

}

document.querySelector('.fa-square-xmark').addEventListener('click', function() {
    document.querySelector('.info-box').style.visibility = "hidden";
})

document.querySelector('.info-btn').addEventListener('click', function() {
    document.querySelector('.info-box').style.visibility = "visible";
})