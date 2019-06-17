const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

$(document).ready(() => {
    // Variable to store current player
    let currentPlayer = 'X'

    // Function to check if the board space is empty
    function emptySpace(boxId) {
        return $(`#${boxId} `).html() == ''
    }

    // Function to change the current game player
    function changePlayer() {
        currentPlayer = currentPlayer == 'X' ? 'O' : 'X'
    }

    function resetGame() {
        // non jquery syntax:
        // document.querySelectorAll('.box').forEach(function(box) {
        //   box.innerHTML = ''
        //   document.getElementById('message').innerHTML = ''
        // })

        $('.box').each(function (index, box) {
            $(box).html('')
            $('#message').html('')
        })
    }

    function handleEndGame(status) {
        if (status == 'draw') {
            $('#message').html(`DRAW GAME`)
        } else {
            $('#message').html(`${currentPlayer} has won!`)
        }

        // const resetBtn = document.createElement('button')
        // resetBtn.addEventListener('click', resetGame)
        // document.getElementById('message').appendChild(resetBtn)

        $('#message')
            .append('<button>Reset</button>')
            .on('click', resetGame)
    }

    function checkWin() {
        let hasWinner = false
        winningCombos.forEach(combo => {
            if (
                !emptySpace(combo[0]) &&
                $(`#${combo[0]} `).html() == $(`#${combo[1]} `).html() &&
                $(`#${combo[1]} `).html() == $(`#${combo[2]} `).html()
            ) {
                hasWinner = true
            }
        })
        return hasWinner
    }

    function isBoardFull() {
        let isFull = true

        $('.box').each(function (index, currentBox) {
            if ($(currentBox).html() == '') {
                isFull = false
            }
        })
        return isFull
    }

    // Select the board and add event listener
    $('#board').on('click', '.box', event => {
        // Capture the event.target
        let clickedBoxId = event.target.id
        // Perform check to see if space is empty
        if (emptySpace(clickedBoxId)) {
            // Set html to X or O
            $(`#${clickedBoxId} `).html(currentPlayer)

            // check for Win
            if (checkWin()) {
                handleEndGame('win')
            }

            // check for Draw
            if (!checkWin() && isBoardFull()) {
                handleEndGame('draw')
            }

            // alternatve X and O
            changePlayer()

        } else {
            alert('This space has already been chosen!')
        }
    })
})