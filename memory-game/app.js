document.addEventListener('DOMContentLoaded', () => {
    // tiles options
    const tilesArray = [
        {
            name: 'cat',
            img: 'img/cat.png'
        },
        {
            name: 'cat',
            img: 'img/cat.png'
        },
        {
            name: 'cheetah',
            img: 'img/cheetah.png'
        },
        {
            name: 'cheetah',
            img: 'img/cheetah.png'
        },
        {
            name: 'dog',
            img: 'img/dog.png'
        },
        {
            name: 'dog',
            img: 'img/dog.png'
        },
        {
            name: 'koala',
            img: 'img/koala.png'
        },
        {
            name: 'koala',
            img: 'img/koala.png'
        },
        {
            name: 'lion',
            img: 'img/lion.png'
        },
        {
            name: 'lion',
            img: 'img/lion.png'
        },
        {
            name: 'llama',
            img: 'img/llama.png'
        },
        {
            name: 'llama',
            img: 'img/llama.png'
        },
        {
            name: 'owl',
            img: 'img/owl.png'
        },
        {
            name: 'owl',
            img: 'img/owl.png'
        },
        {
            name: 'panda',
            img: 'img/panda.png'
        },
        {
            name: 'panda',
            img: 'img/panda.png'
        },
        {
            name: 'penguin',
            img: 'img/penguin.png'
        },
        {
            name: 'penguin',
            img: 'img/penguin.png'
        },
        {
            name: 'racoon',
            img: 'img/racoon.png'
        },
        {
            name: 'racoon',
            img: 'img/racoon.png'
        },
        {
            name: 'tiger',
            img: 'img/tiger.png'
        },
        {
            name: 'tiger',
            img: 'img/tiger.png'
        },
        {
            name: 'wolf',
            img: 'img/wolf.png'
        },
        {
            name: 'wolf',
            img: 'img/wolf.png'
        }
    ];

    tilesArray.sort(() => 0.5 - Math.random());                 // Sort randomly the tiles array

    const grid = document.querySelector('.grid');               // The board
    const resultDisplay = document.querySelector('#result');    // The score
    var tilesChosen = [];                                       // The names of the chosen tiles
    var tilesChosenId = [];                                     // The IDs of the chosen tiles
    var tilesWon = [];                                          // The number of matches (score)

    // Create the board funcion
    function createBoard() {
        for (let i = 0; i < tilesArray.length; i++) {
            var tile = document.createElement('img');
            tile.setAttribute('src', './img/back.png');
            tile.setAttribute('data-id', i);
            tile.addEventListener('click', flipTiles);
            grid.appendChild(tile);
        }
    }

    // Check if the flipped cards match
    function checkForMatches() {
        var tiles = document.querySelectorAll('img');
        const tileOneId = tilesChosenId[0];
        const tileTwoId = tilesChosenId[1];
        if (tilesChosen[0] === tilesChosen[1]) {
            alert('You found a match!');
            tiles[tileOneId].setAttribute('src', './img/blank.png');
            tiles[tileTwoId].setAttribute('src', './img/blank.png');
            tilesWon.push(tilesChosen);
        } else {
            tiles[tileOneId].setAttribute('src', './img/back.png');
            tiles[tileTwoId].setAttribute('src', './img/back.png');
            alert('Sorry, try again');
        }
        tilesChosen = [];
        tilesChosenId = [];
        resultDisplay.textContent = tilesWon.length;
        if (tilesWon.length === tilesArray.length / 2) {
            resultDisplay.textContent = 'Congratulations! You found them all!'
        }
    }

    // Flip tiles
    function flipTiles() {
        var tileId = this.getAttribute('data-id');
        tilesChosen.push(tilesArray[tileId].name);
        tilesChosenId.push(tileId);
        this.setAttribute('src', tilesArray[tileId].img);
        if (tilesChosen.length === 2) {
            setTimeout(checkForMatches, 100);
        }
    }

    createBoard();
});