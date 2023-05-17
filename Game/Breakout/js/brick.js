class Brick {
    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(context) {
        this.context = context

        this.blocksize = 20
        this.padding = 10
        this.offset = 5
        this.width = 0
        this.height = this.height
        this.rows = 25
        this.cols = 10

        this.bricks = []
    }

    setGeometry(width, height) {
        this.width = width
        this.height = height
    }

    reset() {
        this.bricks = []
        this.init()
    }
    
    init() {
        for (let x = 0; x < this.rows; x++) {
            let bricks = []
            for (let y = 0; y < this.cols; y++) {
                let bx = x * (this.blocksize + this.padding) + this.offset
                let by = y * (this.blocksize + this.padding) + this.offset
                let isPrize = Math.floor(Math.random() * 20) + 1
                if (isPrize == 2) {
                    bricks.push({
                        x: bx,
                        y: by,
                        s: true,
                        i: 4,
                        c: 'red'
                    })
                } else {
                    bricks.push({
                        x: bx,
                        y: by,
                        s: true,
                        i: 2,
                        c: 'green'
                    })
                }
            }
            this.bricks.push(bricks)
        }
    }

    draw() {
        for (let row = 0; row < this.bricks.length; row++) {
            for (let col = 0; col < this.bricks[row].length; col++) {
                let brick = this.bricks[row][col]
                if (brick.s) {
                    this.context.fillStyle = brick.c
                    this.context.fillRect(brick.x, brick.y, this.blocksize, this.blocksize)
                }
            }
        }
    }
}