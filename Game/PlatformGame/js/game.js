class Game {
    /**
     * 
     * @param {HTMLElement} canvas 
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(canvas, context) {
        this.canvas = canvas
        this.context = context

        this.player = new Player(context)
        this.obstacle = new Obstacle(context)
        this.ground = new Ground(context)
        
        this.geometry = {
            width: 1080,
            height: 600
        }
        this.passedTime = 0
        this.fps = 0
        this.maxfps = 30

        this.counter = 0
    }

    init() {
        this.canvas.width = this.geometry.width
        this.canvas.height = this.geometry.height

        // ground initialize
        this.ground.setGeometry(this.geometry)

        // player initialize
        this.player.setGeometry(this.geometry)
        this.player.setGround({
            width: this.ground.width,
            height: this.ground.height,
            y: this.ground.y
        })

        this.obstacle.setGeometry(this.geometry)
        this.obstacle.setGround(this.ground)
        this.obstacle.setPlayer(this.player)
    }

    drawFps() {
        this.context.fillStyle = "white"
        this.context.font = "20px Arial"
        this.context.fillText(`Fps: ${this.fps == 0 ? 'wait...' : this.fps}`, 20, 20)
    }

    render() {
        requestAnimationFrame((t) => {
            this.render()
        })
        this.context.clearRect(0, 0, this.geometry.width, this.geometry.height)

        let timestamp = new Date().getTime()
        let secondPassed = (timestamp - this.passedTime) / 1000
        
        if (secondPassed * 1000 > 33.33) {
            this.passedTime = timestamp
        }
        this.drawFps()

        this.ground.draw()

        this.player.draw()
        this.player.gravityUpdate()
        this.player.event()

        this.obstacle.moveObstacle()
        this.obstacle.drawObstacle()

        this.counter += 1
        if (this.counter > 100) {
            this.fps = Math.round(1 / secondPassed)
            this.counter = 0
        }
    }

    start() {
        requestAnimationFrame((t) => {
            this.render()
        })
    }
}