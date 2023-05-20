class Game {
    /**
     * 
     * @param {HTMLElement} canvas 
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(canvas, context) {
        this.canvas = canvas
        this.context = context

        this.width = 412
        this.height = 732
        
        this.settings = {
            stack: {
                speed: 4
            }
        }
        
        this.stack = new Stack(context)
    }

    init() {
        this.canvas.width = this.width
        this.canvas.height = this.height

        this.stack.setGeometry(this.width, this.height)
        this.stack.setSpeed(this.settings.stack.speed)
        this.stack.init()
        this.stack.event()
        this.stack.dx = this.settings.stack.speed
    }

    render() {
        this.context.clearRect(0, 0, this.width, this.height)

        this.stack.draw()
        this.stack.moveLastStack()

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