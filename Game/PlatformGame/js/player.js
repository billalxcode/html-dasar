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
        this.x = 50
        this.y = 0
        this.gravityForce = 7
        this.moveSpeed = 5
        
        this.maxJump = this.gravityForce * 10
        this.jumpSpeed = 10
        this.isJump = false
        this.jumpY = 0

        this.ground = {
            width: 0,
            height: 0,
            y: 0,
            isGround: false
        }
    }

    setGeometry(geometry) {
        this.geometry = geometry
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
            if (code == "Space") {
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
        this.context.fillRect(this.x, this.y, this.blocksize, this.blocksize)

        // draw eye
        this.context.fillStyle = "black"
        this.context.fillRect(this.x + this.blocksize - 20, this.y + (this.blocksize / 5), 20, 10)
    }
}