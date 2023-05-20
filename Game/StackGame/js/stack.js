class Stack {
    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     */
    constructor(context) {
        this.context = context

        this.speed = 0
        this.dx = 0
        this.geometry = {w: 0, h: 0}
        this.stacks = []    
    }

    setSpeed(speed) {
        this.speed = speed
    }

    setGeometry(w, h) {
        this.geometry.w = w
        this.geometry.h = h
    }

    randomColor() {
        var randomColor = Math.floor(Math.random()*16777215).toString(16);
        return "#" + randomColor
    }

    createNewStack(w, h, x, y) {
        let item = {
            w: w,
            h: h,
            x: x,
            y: y,
            f: this.randomColor()
        }
        this.stacks.push(item)
    }

    init() {
        this.createNewStack(
            this.geometry.w / 2,
            20,
            (this.geometry.w / 4),
            this.geometry.h - 20
        )
    }

    moveLastStack() {
        let lastIndex = this.stacks.length - 1
        // let item = this.stacks[lastIndex]
        this.stacks[lastIndex]['x'] += this.dx

        if (this.stacks[lastIndex]['x'] + this.stacks[lastIndex]['w'] > this.geometry.w) {
            this.dx = -this.speed
        } else if (this.stacks[lastIndex]['x'] < 0) {
            this.dx = this.speed
        }
    }

    resizeStack() {
        if (this.stacks.length > 1) {
            let topLayerIndex = this.stacks.length - 1
            let prevLayerIndex = topLayerIndex - 1
            
            const topLayer = this.stacks[topLayerIndex]
            const prevLayer = this.stacks[prevLayerIndex]
            const detla = (topLayer.x - prevLayer.x)
            const overhangSize = Math.abs(detla)
            const overlap = topLayer.w - overhangSize
            console.log(overhangSize)
            // let item = this.stacks[lastIndex]
            // let item_second = this.stacks[lastSecondIndex]

            // let item_start = item.x
            // let item_end = item.x + item.w
            // let item_second_start = item_second.x
            // let item_second_end = item_second.x + item_second.w
            
            // if (item_start < item_second_start) {
            //     let cut_position_start = (item_second_start - item_start)
                
            //     let item_width = item.w - cut_position_start
            //     let item_x = item.x + cut_position_start
            //     this.stacks[lastIndex]['w'] = item_width
            //     this.stacks[lastIndex]['x'] = item_x
            // } else if ((item_start + item.w) > (item_second_start + item_second.w)) {
            //     let cut_position_end = (item_end + item_second_end)

            //     let item_width = cut_position_end - (item_second.w - item.x)
            //     let item_x = cut_position_end - (item.x + item.w) - item.x
                
            //     // console.log(item_x / 2)
            //     this.stacks[lastIndex]['w'] = item_width
            //     this.stacks[lastIndex]['x'] = item_x
            // }
        }
    }

    event() {
        let _this = this
        document.onkeydown = function (event) {
            let code = event.code
            if (code == "Space") {
                _this.resizeStack()
                _this.createNewStack(
                    _this.geometry.w / 2,
                    20,
                    (_this.geometry.w / 4),
                    _this.geometry.h - (20 * (_this.stacks.length + 1) )
                )
            }
        }
    }

    draw() {
        for (let i = 0; i < this.stacks.length; i++) {
            let item = this.stacks[i]
            this.context.fillStyle = item.f
            this.context.fillRect(item.x, item.y, item.w, item.h)
        }
    }
}