/** CONSTANTS **/
const CANVAS_BORDER_COLOUR = 'black'
const CANVAS_BACKGROUND_COLOUR = 'white'
const SNAKE_COLOUR = 'lightgreen'
const SNAKE_BORDER_COLOUR = 'green'
const FOOD_COLOUR = 'red'
const FOOD_BORDER_COLOUR = 'darkred'
const SESSION_STORAGE = window.sessionStorage
const LOCAL_STORAGE = window.localStorage

// buttons
const START_GAME = document.getElementById('startGame')
const PAUSE_GAME = document.getElementById('pauseGame')
const RESTART_GAME = document.getElementById('restartGame')
const RESUME_GAME = document.getElementById('resumeGame')
if (SESSION_STORAGE.currentGame) {
    RESUME_GAME.style.display = 'block';
}

// game mechanics
const SCORE_BOARD = document.getElementById('score')
const HIGH_SCORE_LIST = document.getElementById('highScoreList')


/** button game controls **/

// start game
START_GAME.addEventListener('click', () => init() )

PAUSE_GAME.addEventListener('click', () => pauseGame() )

RESUME_GAME.addEventListener('click', () => resumeGame() )

RESTART_GAME.addEventListener('click', () => {
    SCORE_BOARD.innerHTML = 'Restarting'
    init()
})

function init () {
    gameStart()
    countdown()
    START_GAME.style.display = 'none'
    RESUME_GAME.style.display = 'none'
    PAUSE_GAME.style.display = 'block'
    RESTART_GAME.style.display = 'none'
}

function pauseGame () {
    saveSession()
    PAUSE_GAME.style.display = 'none'
    RESUME_GAME.style.display = 'block'
    gameRunning = false
    dy = 0
    dx = 0
}

function resumeGame () {
    let game = SESSION_STORAGE.getItem('currentGame')
    game = JSON.parse( game )
    mySnake = game.mySnake
    dy = game.dy
    dx = game.dx
    GAME_SPEED = gameSpeed
    currentScore = game.currentScore
    gameRunning = true
    
    // handle buttons
    RESUME_GAME.style.display = 'none'
    setTimeout( function displayPause() {
        if ( gameRunning ) {
            return PAUSE_GAME.style.display = 'block'
        }
    }, 4000)
}

function saveSession () {
    let currentGame = {
        mySnake: snake,
        currentScore: score,
        dx: dx,
        dy: dy,
        gameSpeed: GAME_SPEED
    }
    SESSION_STORAGE.setItem( 'currentGame', JSON.stringify( currentGame ) )
}

// snake object
let snake = [
    {x: 130, y: 150 },
    {x: 120, y: 150 },
    {x: 110, y: 150 },
    {x: 100, y: 150 },
    {x: 90, y: 150 }
]

// game speed
let GAME_SPEED = 100
// is game started
let gameRunning = false
// user score
let score
// changing direction when true
let changingDirection = false
// food x-coordinate
let foodX
// food y-coordinate
let foodY
// horizontal velocity
let dx = 10
// vertical velocity
let dy = 0
let highScore = [
    { name: 'AAA', score: 2500 },
    { name: 'AAA', score: 1500 },
    { name: 'AAA', score: 500 },
    { name: 'AAA', score: 250 },
    { name: 'AAA', score: 100 }
]
let user

(function() {
    sortHighScore()
    checkHighScore()
    createHighScore()
})()

// score
function numberCheck ( scoreToEval ) {
    let tempNum = scoreToEval
    if ( typeof tempNum !== 'number' ) {
        tempNum = Number( tempNum )
    }
    tempNum = tempNum / 100
    return Number.isInteger( tempNum )
}

function nextLevel () {
    console.log('level up')
    return GAME_SPEED -= 5
}

function checkScore () {
    if ( numberCheck ( score ) === true ) return nextLevel()
}

function sortHighScore () {
    highScore.sort(( a, b ) => b.score-a.score )
}

function checkHighScore () {
    if ( !LOCAL_STORAGE.getItem( 'HighScore' ) ) {
        LOCAL_STORAGE.setItem( 'HighScore', JSON.stringify( highScore ) )
    } else {
        highScore = LOCAL_STORAGE.getItem( 'HighScore' )
        highScore = JSON.parse(highScore)
    }
}

function createHighScore () {
    while ( HIGH_SCORE_LIST.hasChildNodes() ) {
        HIGH_SCORE_LIST.removeChild( HIGH_SCORE_LIST.childNodes[0] )
    }
    highScore.forEach(( per ) => {
        let listItem = document.createElement( 'li' )
        listItem.innerHTML = `${per.name} - ${per.score}`
        HIGH_SCORE_LIST.appendChild( listItem )
    })
}

// game start countdown
function countdown() {
    if ( SCORE_BOARD.innerHTML === 'Click Start' || SCORE_BOARD.innerHTML === 'Restarting' ) score = 5
    setTimeout( function() {
        if ( score === 0 ) return gameRunning = true
        decrement()
    }, 850 )
}

function decrement() {
    score--
    SCORE_BOARD.innerHTML = score
    countdown()
}

// Get the canvas element
var gameCanvas = document.getElementById( 'gameCanvas' )

// Return a two dimensional drawing context
var ctx = gameCanvas.getContext( '2d' )

// start game
function gameStart() {
    // ensures clean board
    clearCanvas()
    // draw snake in center
    drawSnake()
    
    // place food
    createFood()
    drawFood()
    
    // start game
    setTimeout( () => main(), 5000 )
}

function gameOver() {
    // if qualified, add to high score
    if (score > highScore[4].score) {
        addInit()
    }
    SESSION_STORAGE.clear()
    snake = [
        {x: 130, y: 150 },
        {x: 120, y: 150 },
        {x: 110, y: 150 },
        {x: 100, y: 150 },
        {x: 90, y: 150 }
    ]
    dx = 10
    dy = 0
    GAME_SPEED = 100
    gameRunning = false
    PAUSE_GAME.style.display = 'none'
    RESTART_GAME.style.display = 'block'
}

function addInit () {
    // prompt for initials
    user = { name: prompt('Enter Your Initials (AAA)'), score: score }
    
    // check valid entry
    if ( user.name.length <= 3 && typeof user.name === 'string' ) {
        user.name = user.name.toUpperCase()
        highScore.pop()
        highScore.push(user)
        sortHighScore()
        LOCAL_STORAGE.setItem( 'HighScore', JSON.stringify( highScore ) )
        createHighScore()
    } else {
        addInit()
    }
}

function clearCanvas() {
    // color fill
    ctx.fillStyle = CANVAS_BACKGROUND_COLOUR
    ctx.strokestyle = CANVAS_BORDER_COLOUR

    // Draw a "filled" rectangle to cover the entire canvas
    ctx.fillRect( 0, 0, gameCanvas.width, gameCanvas.height )
    // Draw a "border" around the entire canvas
    ctx.strokeRect( 0, 0, gameCanvas.width, gameCanvas.height )
}

function main() {
    if ( didGameEnd() ) return
    setTimeout( function onTick() {
        changingDirection = false
        clearCanvas()
        drawFood()
        advanceSnake()
        drawSnake()

        // Call main again
        main()
    }, GAME_SPEED )
}

function didGameEnd () {
    if ( !dx && !dy ) return
    for ( let i = 4; i < snake.length; i++ ) {
        const didCollide = snake[i].x === snake[0].x && snake[i].y === snake[0].y

        if ( didCollide ) {
            gameOver()
            return true
        }
    }

    const hitLeftWall = snake[0].x < 0
    const hitRightWall = snake[0].x > gameCanvas.width - 10
    const hitTopWall = snake[0].y < 0
    const hitBottomWall = snake[0].y > gameCanvas.height - 10

    if ( hitLeftWall || hitBottomWall || hitRightWall || hitTopWall ) {
        gameOver()
        return true
    }
}

/**

SNAKE & FOOD

**/

document.addEventListener( 'keydown', changeDirection )

// draw snake - runs the drawing of each part
function drawSnake() {
    snake.forEach( drawSnakePart )
}

// draw snake parts
function drawSnakePart( snakePart ) {
    ctx.fillStyle = SNAKE_COLOUR
    ctx.strokestyle = SNAKE_BORDER_COLOUR
    ctx.fillRect( snakePart.x, snakePart.y, 10, 10 )
    ctx.strokeRect( snakePart.x, snakePart.y, 10, 10 )
}

function changeDirection ( event ) {
    const LEFT_KEY = 37
    const RIGHT_KEY = 39
    const UP_KEY = 38
    const DOWN_KEY = 40
    const P_KEY = 80

    if ( changingDirection ) return

    changingDirection = true

    const keyPressed = event.keyCode
    const goingUp = dy === -10
    const goingDown = dy === 10
    const goingLeft = dx === -10
    const goingRight = dx === 10

    if ( keyPressed === LEFT_KEY && !goingRight ) {
        dx = -10
        dy = 0
    }

    if ( keyPressed === RIGHT_KEY && !goingLeft ) {
        dx = 10
        dy = 0
    }

    if ( keyPressed === DOWN_KEY && !goingUp ) {
        dx = 0
        dy = 10
    }

    if ( keyPressed === UP_KEY && !goingDown ) {
        dx = 0
        dy = -10
    }

    // pause game
    if ( keyPressed === P_KEY && gameRunning === true ) {
        pauseGame()
    }
}

// move snake forward horizontally
function advanceSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy }
    // add to front
    snake.unshift( head )

    const didEatFood = foodX === snake[0].x && foodY === snake[0].y
    if ( didEatFood ) {
        score += 10
        SCORE_BOARD.innerHTML = score
        checkScore ()
        // add to snake body
        createFood()
    } else {
        // remove tail
        snake.pop()
    }
}

// add food to board
function drawFood() {
    ctx.fillStyle = FOOD_COLOUR
    ctx.strokestyle = FOOD_BORDER_COLOUR
    ctx.fillRect( foodX, foodY, 10, 10 )
    ctx.strokeRect( foodX, foodY, 10, 10 )
}

function randomTen ( min, max ) {
    return Math.round( Math.random() * (max - min) / 10 ) * 10
}

function createFood () {
    foodX = randomTen( 0, gameCanvas.width - 10 )
    foodY = randomTen( 0, gameCanvas.height - 10 )

    snake.forEach( function isFoodOnSnake ( part ) {
        const foodIsOnSnake = foodX === part.x && foodY === part.y
        if ( foodIsOnSnake ) {
            createFood()
        }
    } )
}
