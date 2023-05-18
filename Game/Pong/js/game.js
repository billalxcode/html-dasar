class Game {
    /**
     * 
     * @param {HTMLElement} canvas 
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(canvas, context) {
        this.canvas = canvas
        this.context = context

        this.currentTime = 0
        this.settings = {
            fpslimit: 10,
            player: {
                blocksize: 20,
                width: 10,
                height: 20 * 5,
                speed: 5,
                keymap: [
                    {
                        up: "KeyW",
                        down: "KeyS"
                    },
                    {
                        up: "ArrowUp",
                        down: "ArrowDown"
                    }
                ]
            },
            ball: {
                radius: 10,
                speed: 5
            },
            lineWidth: 2
        }

        this.geometry = {
            width: 720,
            height: 600
        }

        this.player1 = new Player(context)
        this.player2 = new Player(context)
        this.ball = new Ball(context)
    }

    init() {
        this.canvas.width = this.geometry.width
        this.canvas.height = this.geometry.height
        this.context.lineWidth = this.settings.lineWidth

        const player_centery = (this.geometry.height  / 2) -  (this.settings.player.height / 2)
        this.player1.init(this.settings.player.width, this.settings.player.height)
        this.player2.init(this.settings.player.width, this.settings.player.height)

        // set player position
        this.player1.setPosition(30, player_centery)
        this.player2.setPosition(this.geometry.width - (30 * 2), player_centery)

        this.player1.setKeymap(this.settings.player.keymap[0])
        this.player2.setKeymap(this.settings.player.keymap[1])

        this.player1.setGeometry({ w: this.geometry.width, h: this.geometry.height})
        this.player2.setGeometry({ w: this.geometry.width, h: this.geometry.height})

        this.player1.setSpeed(this.settings.player.speed)
        this.player2.setSpeed(this.settings.player.speed)

        this.player1.event()
        // this.player2.event()

        let ball_centerx = (this.geometry.width / 2 + 10)
        let ball_centery = (this.geometry.height / 2)
        this.ball.setPosition(ball_centerx, ball_centery)
        this.ball.setRadius(this.settings.ball.radius)
        this.ball.setSpeed(this.settings.ball.speed)
        this.ball.setDirection(this.settings.ball.speed, 0)
        this.ball.setGeometry({w:this.geometry.width,h:this.geometry.height})
    }

    clear() {
        this.context.clearRect(0, 0, this.geometry.width, this.geometry.height)
    }

    playerCollision() {
        // check player 1
        if (this.ball.x === (this.player1.x + this.player1.width) &&
            this.ball.y > this.player1.y &&
            this.ball.y < this.player1.y + this.player1.height) {
            let x = (this.ball.dx < -1 ? this.ball.speed : -this.ball.speed)
            let y = 0
            if (this.player1.d < -1) {
                y = -this.ball.speed
            } else if (this.player1.d > 1) {
                y = this.ball.speed
            }
            this.ball.setDirection(x, y)
        }
        if (this.ball.x === (this.player2.x + this.player2.width) &&
            this.ball.y > this.player2.y &&
            this.ball.y < this.player2.y + this.player2.height) {
            let x = (this.ball.dx < -1 ? this.ball.speed : -this.ball.speed)
            let y = 0
            if (this.player2.d < -1) {
                y = -this.ball.speed
            } else if (this.player2.d > 1) {
                y = this.ball.speed
            }
            this.ball.setDirection(x, y)
        }
    }

    drawScore() {
        this.context.fillStyle = "white"
        this.context.font = "10px Arial"
        this.context.textAlign = "center"

        this.context.fillText("Score: " + this.player1.score.toString(), 30, 30)
        this.context.fillText("Score: " + this.player2.score.toString(), (this.geometry.width - 30), 30)
    }

    checkBall() {
        if (this.ball.x > this.geometry.width) {
            this.player1.increment()
            this.ball.x = (this.geometry.width / 2)
            this.ball.y = (this.geometry.height / 2)
            this.ball.dx = this.ball.speed
            this.ball.dy = 0
        } else if (this.ball.x < 0) {
            this.player2.increment()
            this.ball.x = (this.geometry.width / 2)
            this.ball.y = (this.geometry.height / 2)
            this.ball.dx = -this.ball.speed
            this.ball.dy = 0
        }
    }

    // randomSpeed() {
    //     this.player1.setSpeed()
    // }

    drawNet() {
        let centerx = (this.geometry.width / 2)
        this.context.fillStyle = "white"
        this.context.fillRect(centerx, 0, 2, this.geometry.height)
    }
    
    render() {
        this.clear()

        this.drawNet()

        this.player1.draw()
        this.player2.draw()
        
        this.player1.move()
        this.player2.ai(this.ball)
        this.player2.move()

        this.ball.draw()
        this.ball.move()

        this.playerCollision()
        this.checkBall()
        this.drawScore()

        let now = Date.now()
        let elapsed = now - this.currentTime
        if (elapsed > this.settings.fpslimit) {
            this.currentTime = now - (elapsed % this.settings.fpslimit)
        }
        requestAnimationFrame((t) => {
            this.render()
        })
    }

    start() {
        requestAnimationFrame((t) => {
            this.render()
        })
    }
}