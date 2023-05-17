class Player {
    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(context) {
        this.context = context
        this.blocksize = 20
        this.width = this.blocksize * 5
        this.height = 20

        this.x = 0
        this.y = 0
        this.d = 0
        this.speed = 10
        this.color = "blue"
    }

    setSpeed(speed) {
        this.speed = speed
    }

    setPosition(x, y) {
        this.x = x
        this.y = y
    }
    
    setDirection(x) {
        this.d = x
    }

    setColor(color) {
        this.color = color
    }

    setup(blocksize, width, height) {
        this.blocksize = blocksize
        this.width = width
        this.height = height
    }

    event() {
        let _this = this
        document.addEventListener('keydown', function(event) {
            let keyCode = event.code
            if (keyCode == "KeyA") {
                _this.setDirection(-_this.speed)
            } else if (keyCode == "KeyD") {
                _this.setDirection(_this.speed)
            }
        })
    }

    move(w) {
        this.x += this.d
        
        if (this.x + this.width > w) {
            this.d = -this.speed
        } else if (this.x < 0) {
            this.d = this.speed
        }
    }

    draw() {
        this.context.fillStyle = this.color
        this.context.strokeStyle = "black"
        this.context.fillRect(this.x, this.y, this.width, this.height)
        this.context.stroke()
    }
}