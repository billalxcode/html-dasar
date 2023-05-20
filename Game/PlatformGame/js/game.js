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
    }

    render() {
        this.context.clearRect(0, 0, this.geometry.width, this.geometry.height)

        this.ground.checkParticle()
        this.ground.draw()

        this.player.draw()
        this.player.gravityUpdate()
        this.player.event()

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