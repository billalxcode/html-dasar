const canvas = document.getElementById('board')
const score = document.getElementById('score')
const context = canvas.getContext('2d')
const blocksize = 20
const rows = 48
const cols = 30
const width = (rows * blocksize)
const height = (cols * blocksize)
const fpslimit = 7 // limit frame per second

let gameInterval

let gameState = false // set game state
let gameOver = false // set gameover

let styles = {
    snake: "lime",
    food: "red",
    grid: "black"
}

let snakes = {
    size: blocksize - 1,
    speed: 1 * blocksize,
    direction: {
        x: 0,
        y: 0
    },
    body: [
        { x: (width / 2), y: (height / 2)}, // set center position
    ]
}
let totalScore = snakes.body.length

let foods = []

function drawGrid() {
    context.strokeStyle = styles.grid
    for (x = 0; x < width; x += blocksize) {
        context.moveTo(x, 0)
        context.lineTo(x, height)
    }
    for (y = 0; y < height; y += blocksize) {
        context.moveTo(0, y)
        context.lineTo(width, y)
    }
    context.stroke()
}

function drawSnake() {
    for (i = 0; i < snakes.body.length; i++) {
        context.fillStyle = styles.snake
        context.fillRect(snakes.body[i].x, snakes.body[i].y,snakes.size, snakes.size)
    }
}

function drawFood() {
    context.fillStyle = styles.food
    foods.forEach((food) => {
        context.fillRect(food.x, food.y, blocksize, blocksize)
    })
}

function moveSnake() {
    // check out of the board
    if (snakes.body[0].x > width) {
        snakes.body[0].x = 0
    }
    if (snakes.body[0].x < 0) {
        snakes.body[0].x = width
    }
    if (snakes.body[0].y > height) {
        snakes.body[0].y = 0
    }
    if (snakes.body[0].y < 0) {
        snakes.body[0].y = height
    }

    // create new head
    let head = {
        x: snakes.body[0].x + snakes.direction.x,
        y: snakes.body[0].y + snakes.direction.y
    }
    
    snakes.body.unshift(head)
    let iseat = false
    foods.forEach((food) => {
        if (snakes.body[0].x == food.x && snakes.body[0].y == food.y) {
            totalScore += 1
            snakes.speed = ((snakes.speed - blocksize) + 1) * blocksize
            let index = foods.indexOf(food)
            foods.splice(index, 1)
            iseat = true
        }
    })

    if (!iseat) {
        snakes.body.pop()
    }

    // check gameover
    for (i = 1; i < snakes.body.length; i += 1) {
        if (snakes.body[0].x == snakes.body[i].x && snakes.body[0].y == snakes.body[i].y) {
            snakes.speed = 0
            snakes.direction.x = 0
            snakes.direction.y = 0
            gameOver = true
        }
    }
}

function placeFood() {
    let x = Math.floor(Math.random() * rows) * blocksize
    let y = Math.floor(Math.random() * cols) * blocksize

    food = {
        x: x,
        y: y
    }

    foods.push(food)
}

function draw() {
    context.clearRect(0, 0, width, height) // clear display
    drawGrid()
    drawSnake()
    drawFood()
}

function changeDirection(event) {
    let code = event.code
    let speed = snakes.speed
    if (code == "KeyD" && snakes.direction.x != -speed) {
        snakes.direction.x = speed
        snakes.direction.y = 0
    } else if (code == "KeyA" && snakes.direction.x != speed) {
        snakes.direction.x = -speed
        snakes.direction.y = 0
    } else if (code == "KeyW" && snakes.direction.y != speed) {
        snakes.direction.x = 0
        snakes.direction.y = -speed
    } else if (code == "KeyS" && snakes.direction.y != -speed) {
        snakes.direction.x = 0
        snakes.direction.y = speed
    }

    if (code == "Space") {
        gameState = !gameState
    }
}

function update() {
    if (gameOver) {
        context.clearRect(0, 0, width, height)
        context.fillStyle = "black"

        context.font = "30px Arial bold"
        context.textAlign = "center"
        context.textBaseLine = "middle"
        context.fillText("Game over! Refresh to reset", (width / 2), (height / 2))
        // clearInterval(gameInterval)
    } else {
        if (gameState) {
            if (foods.length <= 3) {
                placeFood()
            }
            draw()
            moveSnake()
    
            score.textContent = totalScore
        } else {
            context.fillStyle = 'black'
            context.font = "30px Arial bold"
            context.textAlign = "center"
            context.textBaseLine = "middle"
            context.fillText("Press 'Space' to start or stop game", (width / 2), (height / 2))
        }
    }

}

function init() {
    canvas.width = width
    canvas.height = height

    gameInterval = setInterval(update, 1000 / fpslimit)
    document.onkeydown = changeDirection
}

// document.onload = init()