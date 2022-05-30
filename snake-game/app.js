document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width = 10;
    let currentIndex = 0; // So first div in our grid
    let appleIndex = 0;   // So first div in our grid
    let currentSnake = [2, 1, 0] // So the div in our grid being 2 (or the Head), and 0 being the end (or Tail), with all 1's being the body from now on
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        } while(squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple');
    }

    // Start and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime)
    }

    // Deals with all he move outcomes of the snake
    function moveOutcomes() {
        // Deals with snake hitting borders or self
        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) ||           // if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) ||                 // if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) ||               // if snake hits top
            squares[currentSnake[0] + direction].classList.contains('snake')       // if snake hits itself
        ) {
            return clearInterval(interval);
        }

        const tail = currentSnake.pop();                    // Removes the last item of the array and shows it
        squares[tail].classList.remove('snake');            // Removes the snake class from the tail
        currentSnake.unshift(currentSnake[0] + direction);  // Gives direction to the head of the array

        // Deals with snake getting apple
        if (squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple();
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    // Assign functions to keycodes
    function control (e) {
        squares[currentIndex].classList.remove('snake');
        if (e.keyCode === 39) {
            direction = 1;      // Right
        } else if (e.keyCode === 38) {
            direction = -width; // Up
        } else if (e.keyCode === 37) {
            direction = -1;     // Left
        } else if (e.keyCode === 40) {
            direction = +width; // Down
        }
    }

    window.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);
});