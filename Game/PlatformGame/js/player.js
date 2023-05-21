class Player {
    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(context) {
        this.context = context

        this.geometry = {
            width: 0,
            height: 0
        }

        this.blocksize = 50
        this.x = 0
        this.y = 0
        this.gravityForce = 7
        this.moveSpeed = 5
        this.defaultX = 0

        this.maxJump = this.gravityForce * 10
        this.jumpSpeed = 10
        this.isJump = false
        this.jumpY = 0

        this.width = this.blocksize
        this.height = this.blocksize

        this.ground = {
            width: 0,
            height: 0,
            y: 0,
            isGround: false
        }
    }

    setGeometry(geometry) {
        this.geometry = geometry
        this.x = this.geometry.width / 2 - (this.width * 3)
        this.defaultX = geometry.width / 2 - (this.width * 3)
    }

    setGround({ width, height, y}) {
        this.ground.width = width
        this.ground.height = height
        this.ground.y = y
    }

    event() {
        let _this = this
        document.onkeydown = (event) => {
            let code = event.code
            if (code == "Space" && _this.ground.isGround) {
                this.isJump = true
                this.jumpY = this.y
            } else if (code == "KeyA") {
                _this.x -= this.moveSpeed
            } else if (code == "KeyD") {
                _this.x += this.moveSpeed
            }
            document.close()
        }
    }

    gravityUpdate() {
        if (this.isJump) {
            let xmin = (this.jumpY - this.maxJump) - this.blocksize
            if (this.y < xmin) {
                this.jumpY = 0
                this.isJump = false
            } else {
                this.y -= this.jumpSpeed
            }
        } else {
            this.y += this.gravityForce
        }

        if (this.y >= this.ground.y - (this.blocksize + 1)) {
            this.isJump = false
            this.y = this.ground.y - (this.blocksize + 1)
            this.ground.isGround = true
        } else if (this.y < this.ground.y) {
            this.ground.isGround = false
        }
    }
    
    draw() {
        this.context.fillStyle = "white"
        this.context.fillRect(this.x, this.y, this.width, this.height)

        // draw eye
        this.context.fillStyle = "black"
        this.context.fillRect(this.x + this.width - 20, this.y + (this.height / 5), 20, 10)
    }
}