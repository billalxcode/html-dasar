class Bullet {
    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(context) {
        this.context = context

        this.radius = 10
        this.x = 0
        this.y = 0
        this.dx = 10
        this.dy = 10
        this.speed = 0
        this.geometry = {
            width: 0,
            height: 0
        }
    }

    setRadius(radius) {
        this.radius = radius
    }

    setSpeed(speed) {
        this.speed = speed
    }

    setGeometry({ width, height}) {
        this.geometry.width = width
        this.geometry.height = height
    }

    move() {
        this.x += this.dx
        this.y += this.dy
        
        if (this.x > this.geometry.width) {
            this.dx = -this.speed
        }
        if (this.x < 0) {
            this.dx = this.speed
        }
        
        if (this.y < 0) {
            this.dy = this.speed
        }
    }

    draw() {
        let path = new Path2D()
        path.arc(this.x, this.y, this.radius, 0, Math.PI * 5)
        this.context.fillStyle = "black"
        this.context.fill(path)
    }
}