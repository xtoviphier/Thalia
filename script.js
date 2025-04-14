// Snake Game Logic
const snakeCanvas = document.getElementById('snake-game');
const snakeCtx = snakeCanvas.getContext('2d');

let snake = [{ x: 100, y: 100 }]; // Initial position of the snake
let direction = { x: 0, y: 0 }; // Movement direction
let food = { x: 30, y: 30 }; // Food position
let speed = 5; // Reduced speed (half the original)

function drawSnake() {
    snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height); // Clear the canvas
    snakeCtx.fillStyle = 'green';
    snake.forEach(segment => {
        snakeCtx.fillRect(segment.x, segment.y, 10, 10); // Draw the snake
    });
}

function drawFood() {
    snakeCtx.fillStyle = 'red';
    snakeCtx.fillRect(food.x, food.y, 10, 10); // Draw the food
}

function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * 10,
            y: Math.floor(Math.random() * 20) * 10
        }; // Generate new food position
    } else {
        snake.pop(); // Remove the tail if no food is eaten
    }

    // Prevent the snake from leaving the canvas
    if (
        head.x < 0 || head.x >= snakeCanvas.width ||
        head.y < 0 || head.y >= snakeCanvas.height
    ) {
        resetGame(); // Reset the game if the snake hits the wall
    }
}

function resetGame() {
    snake = [{ x: 100, y: 100 }];
    direction = { x: 0, y: 0 };
    food = { x: 30, y: 30 };
}

function snakeGameLoop() {
    updateSnake();
    drawSnake();
    drawFood();
    requestAnimationFrame(snakeGameLoop); // Continuous animation loop
}

document.addEventListener('keydown', event => {
    // Change direction based on arrow key presses
    if (event.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -speed };
    if (event.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: speed };
    if (event.key === 'ArrowLeft' && direction.x === 0) direction = { x: -speed, y: 0 };
    if (event.key === 'ArrowRight' && direction.x === 0) direction = { x: speed, y: 0 };
});

snakeGameLoop(); // Start the Snake game loop

// Pac-Man Game Logic
const pacmanCanvas = document.getElementById('pacman-game');
const pacmanCtx = pacmanCanvas.getContext('2d');

let pacman = { x: 100, y: 100 }; // Initial position of Pac-Man
let pacmanDirection = { x: 0, y: 0 }; // Movement direction
let pacmanSpeed = 5; // Reduced speed (half the original)

function drawPacman() {
    pacmanCtx.clearRect(0, 0, pacmanCanvas.width, pacmanCanvas.height); // Clear the canvas
    pacmanCtx.beginPath();
    pacmanCtx.arc(pacman.x, pacman.y, 50, 0.25 * Math.PI, 1.75 * Math.PI); // Draw Pac-Man's mouth
    pacmanCtx.lineTo(pacman.x, pacman.y);
    pacmanCtx.fillStyle = 'yellow';
    pacmanCtx.fill();
    pacmanCtx.closePath();
}

function updatePacman() {
    // Update Pac-Man's position based on the current direction
    pacman.x += pacmanDirection.x * pacmanSpeed;
    pacman.y += pacmanDirection.y * pacmanSpeed;

    // Prevent Pac-Man from leaving the canvas
    if (
        pacman.x < 0 || pacman.x >= pacmanCanvas.width ||
        pacman.y < 0 || pacman.y >= pacmanCanvas.height
    ) {
        resetPacmanGame(); // Reset the game if Pac-Man hits the wall
    }
}

function resetPacmanGame() {
    pacman = { x: 100, y: 100 };
    pacmanDirection = { x: 0, y: 0 };
}

function pacmanGameLoop() {
    updatePacman();
    drawPacman();
    requestAnimationFrame(pacmanGameLoop); // Continuous animation loop
}

document.addEventListener('keydown', event => {
    // Change direction based on arrow key presses
    if (event.key === 'ArrowUp' && pacmanDirection.y === 0) pacmanDirection = { x: 0, y: -pacmanSpeed };
    if (event.key === 'ArrowDown' && pacmanDirection.y === 0) pacmanDirection = { x: 0, y: pacmanSpeed };
    if (event.key === 'ArrowLeft' && pacmanDirection.x === 0) pacmanDirection = { x: -pacmanSpeed, y: 0 };
    if (event.key === 'ArrowRight' && pacmanDirection.x === 0) pacmanDirection = { x: pacmanSpeed, y: 0 };
});

pacmanGameLoop(); // Start the Pac-Man game loop
