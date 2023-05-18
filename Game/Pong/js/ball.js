class Ball {
    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(context) {
        this.context = context

        this.x = 0
        this.y = 0
        this.dx = 0
        this.dy = 0
        this.speed = 0
        this.radius = 10
        this.geometry = {w: 0, h:0}
    }

    setGeometry(geometry) {
        this.geometry = geometry
    }

    setRadius(radius) {
        this.radius = radius
    }

    setSpeed(speed) {
        this.speed = speed
    }

    setPosition(x, y) {
        this.x = x
        this.y = y
    }

    setDirection(x, y) {
        this.dx = x
        this.dy = y
    }

    move() {
        this.x += this.dx
        this.y += this.dy

        if (this.y > this.geometry.h) {
            this.dy = -this.speed
        } else if (this.y < 0) {
            this.dy = this.speed
        }
    }

    draw() {
        let path = new Path2D()
        path.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        this.context.fillStyle = "red"
        this.context.fill(path)
    }
}