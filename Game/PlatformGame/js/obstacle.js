class Obstacle {
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
        this.ground = {
            width: 0,
            height: 0,
            y: 0
        }
        this.player = null
        this.playerDirection = 0

        this.moveSpeed = 7
        this.obstacles = []
        this.maxobstacle = 10
        this.objectOffsetX = 200
        this.objects = [
            {
                name: 'rock',
                width: 20,
                height: 20,
                color: "grey",
                action: null
            },
            {
                name: "bird",
                width: 25,
                height: 20,
                color: 'blue',
                ation: new Bird()
            }
        ]
    }

    setGeometry(geometry) {
        this.geometry = geometry
    }

    setGround(ground) {
        this.ground = ground
    }

    setPlayer(player) {
        this.player = player
    }

    generateObstacle() {
        const randomNumber = parseInt(new Date().getTime())
        let objIndex = Math.floor(Math.random() * this.objects.length)
        let obj = this.objects[objIndex]
        var x = x = Math.floor(Math.random() * (this.geometry.width * 5 - this.geometry.width) + this.geometry.width)
        var y = 0
        y = this.ground.y - (obj.height + 1)
        this.obstacles.push({
            x: x + this.objectOffsetX,
            y: y,
            w: obj.width,
            h: obj.height,
            a: obj.action,
            c: obj.color
        })
    }

    moveObstacle() {
        var obstacleLength = this.obstacles.length
        for (let index = 0; index < obstacleLength; index++) {
            let obstacle = this.obstacles[index]
            if (obstacle !== undefined) {
                this.obstacles[index].x -= this.moveSpeed
                this.collision(obstacle)
                if (obstacle.x < 0) {
                    this.obstacles.splice(index, 1)
                }
            }
        }
        if (this.player.ground.isGround && obstacleLength < this.maxobstacle) {
            this.generateObstacle()
        }
    }

    collision(obstacle) {
        this.player.x += this.playerDirection
        if (
            this.player.x + this.player.width > obstacle.x &&
            this.player.x + this.player.width < obstacle.x + obstacle.w &&
            this.player.y + this.player.height > obstacle.y
        ) {
            this.playerDirection = -this.moveSpeed
        } else {
            if (this.playerDirection == 0 && this.player.x < this.player.defaultX) {
                this.playerDirection = 0.1
            } else {
                this.playerDirection = 0
            }
        }
    }

    drawObstacle() {
        var obstacleLength = this.obstacles.length
        for (let i = 0; i < obstacleLength; i++) {
            let obstacle = this.obstacles[i]
            this.context.fillStyle = obstacle.c
            this.context.fillRect(
                obstacle.x,
                obstacle.y,
                obstacle.w,
                obstacle.h
            )
        }
    }
}