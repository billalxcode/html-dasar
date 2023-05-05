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
    bodies: [
        {
            x: (rows * blocksize) / 2,
            y: (cols * blocksize) / 2
        },
        {
            x: (rows * blocksize) / 2 - blocksize,
            y: (cols * blocksize) / 2
        },
        {
            x: (rows * blocksize) / 2 - (blocksize * 2),
            y: (cols * blocksize) / 2
        },
        
    ]
}

let foods = {}
let totalScore = 0

let gameStart = true

function drawSnake() {
    context.fillStyle = styles.snake

    snakes.bodies.forEach((body) => {
        context.fillRect(body.x, body.y, snakes.size, snakes.size)
    })
}

function drawFood() {
    context.fillStyle = styles.food
    // for (i = 0; i < foods.length; i += 1) {
    //     context.fillRect(foods[i].x, foods[i].y, snakes.size, snakes.size)
    // }
    context.fillRect(foods.x, foods.y, snakes.size, snakes.size)
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

function changeDirection(event) {
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
    
    foods = {
        x: x,
        y: y
    }
}

function controller() {
    if (snakes.bodies[0].x < 0) {
        snakes.bodies[0].x = width
    } else if (snakes.bodies[0].x > width) {
        snakes.bodies[0].x = 0
    } else if (snakes.bodies[0].y < 0) {
        snakes.bodies[0].y = height
    } else if (snakes.bodies[0].y > width) {
        snakes.bodies[0].y = 0
    }
    const head = {
        x: snakes.bodies[0].x + snakes.direction.x,
        y: snakes.bodies[0].y + snakes.direction.y
    }

    snakes.bodies.unshift(head)

    if (snakes.bodies[0].x == foods.x && snakes.bodies[0].y == foods.y) {
        totalScore += 1
        score.textContent = totalScore
        
        placeFood()
    } else {
        snakes.bodies.pop()
    }
}

function update() {
    if (gameStart) {
        context.clearRect(0, 0, width, height)
        if (Object.keys(foods).length == 0) {
            placeFood()
        }
        controller()
        draw()

        // console.log(snakes.bodies.length)
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
document.onkeydown = changeDirection