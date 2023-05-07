class Helpers {
    /**
     * 
     * @param {Number} max 
     */
    randomInteger(max) {
        return Math.floor(Math.random() * max) + 1
    }
    
    /**
     * Random Integer with step
     * 
     * @param {Number} max
     * @param {Number} step
     */
    randomIntegerWithStep(max, step) {
        return (this.randomInteger(max) + 1) * step
    }
}

class Snake {
    /**
     * 
     * @param {HTMLElement} canvas 
     * @param {CanvasRenderingContext2D} context 
     * @param {HTMLElement} score 
     * @param {HTMLElement} timer 
     * @param {HTMLElement} rewindRange 
     * @param {HTMLElement} rewindButton 
     */
    constructor(canvas, context, score, timer, rewindRange, rewindButton) {
        this.canvas = canvas
        this.context = context
        this.score = score
        this.timer = timer
        this.rewindRange = rewindRange
        this.rewindButton = rewindButton

        this.animationFrame = undefined
        
        this.blocksize = 20
        this.rows = 48
        this.cols = 30
        this.width = (this.rows * this.blocksize)
        this.height = (this.cols * this.blocksize)

        this.blocks = []

        this.player = {
            score: 0,
            name: ""
        }

        this.snakes = {
            size: this.blocksize,
            speed: 1 * this.blocksize,
            ms: 100,
            direction: {
                x: 0,
                y: 0
            },
            color: {
                fill: "#ffd32a"
            },
            body: []
        }

        this.foods = [
            
        ]

        this.secondPassed = 0
        this.helper = new Helpers()
    }

    /**
     * Set player name
     * 
     * @param {String} name 
     */
    setName(name) {
        this.player.name = name
    }

    init() {
        this.canvas.width = this.width
        this.canvas.height = this.height

        for (let x = 0; x < this.width; x += this.blocksize) {
            let rows = []
            for (let y = 0; y < this.height; y += this.blocksize) {
                let xblock = x / this.blocksize % 2
                let yblock = y / this.blocksize % 2
                let fill = (xblock == 0 && yblock == 1) || (xblock == 1 && yblock == 0) ? "#1c4e6b" : "#133954"
                rows.push({
                    x: x,
                    y: y,
                    fill: fill,
                    stroke: 'black'
                })
            }

            this.blocks.push(rows)
        }

        for (let i = 0; i < 5; i += 1) {
            let x = (this.width / 2) - (this.blocksize * i)
            let y = (this.height / 2)

            this.snakes.body.push({
                x: x,
                y: y
            })
        }

        for (let i = 0; i < 5; i++) {
            this.makeFood()
        }

        this.handleEvent()
    }

    /**
     * Create food location and save to variable foods
     */
    makeFood() {
        if (this.foods.length <= 5) {
            let x = this.helper.randomIntegerWithStep(this.rows, this.blocksize)
            let y = this.helper.randomIntegerWithStep(this.cols, this.blocksize)
    
            this.foods.push({
                x: x,
                y: y
            })
        }
    }
    
    drawBoard() {
        for (let row = 0; row < this.blocks.length; row+=1) {
            for (let col = 0; col < this.blocks[row].length; col+=1) {
                let block = this.blocks[row][col]
                this.context.fillStyle = block.fill
                this.context.strokeStyle = block.stroke
                this.context.fillRect(block.x, block.y, this.blocksize, this.blocksize)
                this.context.stroke()
            }
        }
    }

    drawSnake() {
        for (let i = 0; i < this.snakes.body.length; i += 1) {
            let snake = this.snakes.body[i]
            this.context.fillStyle = this.snakes.color.fill
            this.context.fillRect(snake.x, snake.y, this.snakes.size, this.snakes.size)
        }
    }

    drawFood() {
        for (let i = 0; i < this.foods.length; i++) {
            this.context.fillStyle = "red"
            this.context.fillRect(this.foods[i].x, this.foods[i].y, this.snakes.size, this.snakes.size)
        }
    }

    handleEvent() {
        let _this = this
        let speed = this.snakes.speed
        let direction = this.snakes.direction

        document.addEventListener('keydown', function (event) {
            let keycode = event.key.toLowerCase()
            if (keycode == "a" && direction.x != speed) {
                direction.x = -speed
                direction.y = 0
            } else if (keycode == "d" && direction.x != -speed) {
                direction.x = speed
                direction.y = 0
            } else if (keycode == "w" && direction.y != speed) {
                direction.x = 0
                direction.y = -speed
            } else if (keycode == "s" && direction.y != -speed) {
                direction.x = 0
                direction.y = speed
            }
        })

        this.snakes.direction = direction 

        // make new food every 3 second
        setInterval(function() {
            console.log(_this.foods.length)
            _this.makeFood()
        }, 3000)
    }

    checkSnakeEatFood() {
        let head = this.snakes.body[0]
        let eaten = false
        for (let i = 0; i < this.foods.length; i++) {
            let food = this.foods[i]
            if (head.x == food.x && head.y == food.y) {
                eaten = true
                this.score.textContent = parseInt(this.score.textContent) + 1
                this.foods.splice(i, 1)
                return true
            }
        } 
        return eaten
    }

    moveSnake() {
        let head = {
            x: this.snakes.body[0].x + this.snakes.direction.x,
            y: this.snakes.body[0].y + this.snakes.direction.y
        }
        if (head.x > this.width) head.x = 0
        if (head.y > this.height) head.y = 0
        if (head.x < 0) head.x = this.width
        if (head.y < 0) head.y = this.height
        
        this.snakes.body.unshift(head)

        let eaten = this.checkSnakeEatFood()
        if (!eaten) this.snakes.body.pop()
        for (let i = 1; i < this.snakes.body.length; i++) {
            // if (head.x == this.snakes.body[i].x && head.y == this.snakes.body[i].y) alert("Game Over")
        }
    }

    render(timestamp) {
        // Clear canvas
        this.context.clearRect(0, 0, this.width, this.height)

        this.drawBoard()
        this.drawSnake()
        this.drawFood()
        let passed = timestamp - this.secondPassed
        if (passed > this.snakes.ms) {
            this.moveSnake()
            this.secondPassed = timestamp
        }

        this.animationFrame = requestAnimationFrame((_timestamp) => {
            this.render(_timestamp)
        })
    }

    start() {
        this.animationFrame = requestAnimationFrame((timestamp) => {
            this.render(0)
        })
    }
}