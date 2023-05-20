const canvas = document.getElementById('board')
const context = canvas.getContext('2d')

function init() {
    const game = new Game(canvas, context)
    game.init()
    game.start()
}

document.onload = init()