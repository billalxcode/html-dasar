class Ground {
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
        this.width = this.geometry.width,
        this.height = this.geometry.height - (this.geometry.height - 100),
        this.y = this.geometry.height - 100
        this.moveSpeed = 10

        this.particles = []
        this.maxParticle = 200
    }

    generateParticle() {
        let x = Math.floor(Math.random() * (this.geometry.width - 1) + 1)
        let y = Math.floor(Math.random() * (this.geometry.height - (this.y + 5)) + (this.y + 5))
        // let color = this.randColor()
        let color = "lime"

        this.particles.push({
            x: x + this.geometry.width,
            y: y,
            r: Math.floor(Math.random() * (5 - 2) + 2),
            c: color
        })
    }

    checkParticle() {
        if (this.particles.length < this.maxParticle) {
            this.generateParticle()
        }
        // this.moveParticle()
    }

    randColor() {
        return "#" + Math.floor(Math.random()*16777215).toString(16);
    }

    setGeometry(geometry) {
        this.geometry = geometry
        this.width = this.geometry.width,
        this.height = this.geometry.height - (this.geometry.height - 100),
        this.y = this.geometry.height - 100
    }

    moveParticle() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].x -= this.moveSpeed

            if (this.particles[i].x < 0) {
                this.particles.splice(i, 1)
            }
        }
    }

    drawParticle() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].x -= this.moveSpeed

            if (this.particles[i].x < 0) {
                this.particles.splice(i, 1)
            }

            let particle = this.particles[i]
            let path = new Path2D()
            path.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
            this.context.fillStyle = particle.c
            this.context.fill(path)
        }
    }

    draw() {
        this.context.fillStyle = "#554132"
        this.context.strokeStyle = "#554132"
        this.context.moveTo(0, this.y)
        this.context.lineTo(this.geometry.width, this.y)
        this.context.rect(0, this.y, this.geometry.width, this.geometry.height)
        this.context.fill()
        this.context.stroke()

        this.drawParticle()
    }
}