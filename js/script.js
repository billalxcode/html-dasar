const menu = document.getElementById('menu')
const game = document.getElementById('game')
const formElement = document.getElementById('myform')
const nameElement = document.getElementById('name')
const play = document.getElementById('play')
const playerName = document.getElementById('playerName')

nameElement.addEventListener('change', function () {
    // enable button if name is not blank
    let name = String(nameElement.value)
    if (name.trim() == "") {
        play.disabled = true
    } else {
        play.disabled = false
    }
})

formElement.addEventListener('submit', function(event) {
    event.preventDefault()
    let name = String(nameElement.value)
    menu.style.display = 'none'
    game.style.display = 'block'
    playerName.textContent = name
    init()
})