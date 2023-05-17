class Game {
    /**
     * @param {HTMLElement} canvas
     * @param {CanvasRenderingContext2D} context
     * @param {HTMLElement} score
     */
    constructor(canvas, context, score) {
        this.canvas = canvas
        this.context = context
        this.score = score
        this.isGameOver = false
        this.state = false

        this.level = 1
        this.settings = {
            speed: 5,
            player: {
                blocksize: 20,
                width: 20 * 5,
                height: 20,
                colors: [
                    "blue",
                    "green",
                    "red"
                ]
            },
            bullet: {
                radius: 10,
            }
        }
        this.player = new Player(context)
        this.bricks = new Brick(context)
        this.bullet = new Bullet(context)

        this.scoreValue = 0
        this.width = 720
        this.height = 600
        this.currentTime = 0
        this.animation = null
    }

    init() {
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.player.setup(
            this.settings.player.blocksize,
            this.settings.player.width,
            this.settings.player.height
        )
        this.player.setSpeed(this.settings.speed)
        this.player.setColor(
            this.settings.player.colors[this.level - 1]
        )
        this.player.setPosition(0, this.height - (
            this.settings.player.blocksize * 3
        ))
        this.player.event()

        this.bullet.setRadius(
            this.settings.bullet.radius
        )
        this.bullet.setSpeed(
            this.settings.speed
        )
        this.bullet.setGeometry({
            width: this.width,
            height: this.height
        })
        this.bullet.x = (this.settings.bullet.radius * 3)
        this.bullet.y = (this.settings.bullet.radius * 3)
        this.bullet.x = (this.player.x + this.player.width / 2)
        this.bullet.y = (this.player.y - this.bullet.radius)
    }

    reset() {
        this.scoreValue = 0
        this.state = false
        this.isGameOver = false
        this.bricks.reset()

        this.player.setPosition(0, this.height - (
            this.settings.player.blocksize * 3
        ))

        this.bullet.x = (this.settings.bullet.radius * 3)
        this.bullet.y = (this.settings.bullet.radius * 3)
        this.bullet.x = (this.player.x + this.player.width / 2)
        this.bullet.y = (this.player.y - this.bullet.radius)
    }

    gameOver() {
        let centerx = (this.width / 2)
        let centery = (this.height / 2)
        this.context.fillStyle = "black"
        this.context.font = "bold 50px Arial"
        this.context.textAlign = "center"
        this.context.fillText("GameOver", centerx, centery)
        this.context.font = "20px Arial"
        this.context.fillText("Press 'R' to restart the game", centerx, centery + (50 - 20))
        cancelAnimationFrame(this.animation)

        document.addEventListener("keydown", (event) => {
            if (event.code == "KeyR") {
                this.reset()
                document.close()
            }
        })
    }

    checkCollision() {
        // Bounce bullet if collision in player
        if (this.bullet.x > this.player.x &&
            this.bullet.x < this.player.x + this.player.width &&
            this.bullet.y > this.player.y &&
            this.bullet.y < this.player.y + this.player.height) {
                this.bullet.dy = -this.bullet.speed
        }

        if (this.bullet.y > this.height) {
            this.isGameOver = true
        }

        for (let brow = 0; brow < this.bricks.bricks.length; brow++) {
            for (let bcol = 0; bcol < this.bricks.bricks[brow].length; bcol++) {
                let brick = this.bricks.bricks[brow][bcol]
                if (this.bullet.x > brick.x &&
                    this.bullet.x < brick.x + this.bricks.blocksize && 
                    this.bullet.y > brick.y &&
                    this.bullet.y < brick.y + this.bricks.blocksize && brick.s) {
                        let score = this.bricks.bricks[brow][bcol]['i']
                        this.scoreValue += score
                        this.bricks.bricks[brow][bcol]['s'] = false
                        this.bullet.dy = this.bullet.speed
                    }
            }
        }
    }

    /**
     * Render and update all object
     */
    render(time) {
        let secondPassed = (time - this.currentTime) / 1000
        this.currentTime = secondPassed

        this.context.clearRect(0, 0, this.width, this.height)
        if (!this.isGameOver) {
            this.player.draw()
            this.player.move(this.width)
            
            this.bricks.draw()
            
            this.bullet.draw()
            this.bullet.move()
            this.checkCollision()
            
            this.score.innerText = this.scoreValue
        } else {
            this.player.draw()
            this.gameOver()
        }
        
        this.animation = requestAnimationFrame((timestamp) => {
            this.render(timestamp)
        })
    }

    startup() {
        this.context.clearRect(0, 0, this.width, this.height)
        this.player.draw()
        this.bullet.draw()

        let centerx = (this.width / 2)
        let centery = (this.height / 2)
        this.context.font = "30px Arial"
        this.context.textAlign = "center"
        this.context.fillText("Click 'Space' to start the game", centerx, centery)
    }

    /**
     * Start game
     */
    start() {
        this.startup()

        if (this.state) {
            this.animation = requestAnimationFrame((timestamp) => {
                this.render(0)
            })
        } else {
            let _this = this
            document.addEventListener('keydown', function (event) {
                if (event.code == "Space") {
                    _this.state = true
                    _this.bricks.init()
                    _this.start()
                    document.close()
                }
            })
        }
    }
}