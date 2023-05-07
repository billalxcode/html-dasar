const score         = document.getElementById('score')
const timer         = document.getElementById('timer')
const rewindRange   = document.getElementById('rewindRange')
const btnCancel     = document.getElementById('btn-cancel')
const btnRewind     = document.getElementById('btn-rewind')
const btnPlay       = document.getElementById('btn-play')
const playerName    = document.getElementById('playerName')

const intruction    = document.getElementById('intruction')
const playground    = document.getElementById('playground')
const board         = document.getElementById('board')
const context       = board.getContext('2d')

intruction.style.display = 'none'
playground.style.display = 'block'
let snake = new Snake(board, context, score, timer, rewindRange, btnRewind)

snake.setName('Billal')
snake.init()
snake.start()

btnPlay.addEventListener('click', function () {
    let name = playerName.value
    if (name == '') {
        alert('Masukan nama kamu')
    } else {

        snake.setName(name)
        snake.init()
        snake.start()
    }
})

playerName.addEventListener('input', function (event) {
    if (event.target.value == "") {
        btnPlay.setAttribute('disabled', true)
    } else {
        btnPlay.removeAttribute('disabled')
    }
})