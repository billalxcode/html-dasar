class Player {
    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(context) {
        this.context = context

        this.width = 0
        this.height = 0
        this.speed = 0
        this.x = 0
        this.y = 0
        this.d = 0

        this.geometry = {w: 0, h: 0}
        this.keymap = {
            up: null,
            down: null
        }
        this.lastBallY = 0
        this.score = 0
    }

    init(width, height) {
        this.width = width
        this.height = height
    }

    increment() {
        this.score++
    }

    setSpeed(speed) {
        this.speed = speed
    }

    setKeymap(keymap) {
        this.keymap = keymap
    }

    setPosition(x, y) {
        this.x = x
        this.y = y
    }

    setGeometry({w,h}) {
        this.geometry = {w: w, h: h}
    }

    event() {
        let _this = this
        document.addEventListener('keydown', function (event) {
            if (event.code == _this.keymap.up) {
                _this.d = -_this.speed
            } else if (event.code == _this.keymap.down) {
                _this.d = _this.speed
            }
        })
    }

    randomOffset() {
        return Math.floor(Math.random() * (1 - 0.1)) + 0.1
    }
    /**
     * 
     * @param {Ball} ball 
     */
    ai(ball) {
        const playerCenter = this.y + this.height / 2
        const balLCenter = ball.y
        if (playerCenter < balLCenter) {
            this.d = this.speed
        } else {
            this.d = -this.speed
        }
    }

    move() {
        this.y += this.d

        if (this.y + this.height > this.geometry.h) {
            this.d = 0
            this.y = this.geometry.h - this.height
        } else if (this.y < 0) {
            this.d = 0
            this.y = 0
        }
    }

    draw() {
        this.context.fillStyle = "blue"
        this.context.fillRect(this.x, this.y, this.width, this.height)
    }
}