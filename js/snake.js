const blocksize = 20
const rows = 48
const cols = 30
const width = (rows * blocksize)
const height = (cols * blocksize)
const fpslimit = 7

const canvas = document.getElementById('board')
const score = document.getElementById('score')
const context = canvas.getContext('2d')

const styles = {
    snake: "lime",
    tail: "green",
    food: "red",
    grid: "black",
}

let snakes = {
    size: blocksize - 1,
    speed: 1 * blocksize,
    direction: {
        x: 0,
        y: 0
    },
    head: {
        x: (rows * blocksize) / 2,
        y: (cols * blocksize) / 2
    },
    tails: [
    ]
}

let foods = []
let totalScore = 0

let gameStart = false

function drawSnake() {
    context.fillStyle = styles.snake
    context.fillRect(snakes.head.x, snakes.head.y, snakes.size, snakes.size)

    for (i = 0; i < snakes.tails.length; i++) {
        context.fillStyle = styles.tail
        context.fillRect(snakes.tails[i].x, snakes.tails[i].y, snakes.size, snakes.size)
    }
}

function drawFood() {
    context.fillStyle = styles.food
    for (i = 0; i < foods.length; i += 1) {
        context.fillRect(foods[i].x, foods[i].y, snakes.size, snakes.size)
    }
}

function drawGrid() {
    context.strokeStyle = styles.grid
    for (xy = 0; xy < width; xy += blocksize) {
        // Draw vertical line
        context.moveTo(xy, 0)
        context.lineTo(xy, height)

        // Draw horizontal line
        context.moveTo(0, xy)
        context.lineTo(width, xy)
    }
    context.stroke()

}

function draw() {
    drawGrid()
    drawSnake()
    drawFood()
}

function keyHandler(event) {
    let speed = snakes.speed
    let keyCode = event.code
    if (keyCode == "ArrowLeft" || keyCode == "KeyA") {
        snakes.direction.x = -speed
        snakes.direction.y = 0
    } else if (keyCode == "ArrowRight" || keyCode == "KeyD") {
        snakes.direction.x = speed
        snakes.direction.y = 0
    } else if (keyCode == "ArrowUp" || keyCode == "KeyW") {
        snakes.direction.x = 0
        snakes.direction.y = -speed
    } else if (keyCode == "ArrowDown" || keyCode == "KeyS") {
        snakes.direction.x = 0
        snakes.direction.y = speed
    } else if (keyCode == "Space") {
        gameStart = !gameStart
    }

}

function placeFood() {
    let x = Math.floor(Math.random() * rows) * blocksize
    let y = Math.floor(Math.random() * cols) * blocksize
    
    foods.push({
        x: x,
        y: y
    })
}

function checkCollision() {
    if (snakes.head.x >= width) {
        snakes.head.x = 0
    } else if (snakes.head.x <= -1) {
        snakes.head.x = width
    } else if (snakes.head.y >= height) {
        snakes.head.y = 0
    } else if (snakes.head.y <= -1) {
        snakes.head.y = height
    }

    foods.forEach((food) => {
        if (snakes.head.x == food.x && snakes.head.y == food.y) {
            totalScore += 1
            let index = foods.indexOf(food)
            foods.splice(index, 1)

            score.innerText = totalScore

            snakes.tails.push({
                x: food.x,
                y: food.y
            })
        }
    })
}
function controller() {
    snakes.head.x += snakes.direction.x
    snakes.head.y += snakes.direction.y
    
    for (i = 0; i < snakes.tails.length; i++) {
        snakes.tails[i] = {
            x: snakes.tails[i].x + snakes.direction.x,
            y: snakes.tails[i].y + snakes.direction.y
        }
    }
}

function update() {
    if (gameStart) {
        context.clearRect(0, 0, width, height)
        if (foods.length <= 2) {
            placeFood()
        }
        controller()
        draw()
        checkCollision()
    } else {
        context.font = "20px Arial"
        context.fillStyle = "black"
        context.fillText("Press 'Space' to start or stop game", (width / 5), (height / 2))
    }
}

function init() {
    canvas.width = width
    canvas.height = height

    placeFood()
    setInterval(update, (1000 / fpslimit)) // limit fps to 14 fps
}

document.onload = init()
document.onkeydown = keyHandler