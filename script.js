// Pac-Man Game Logic
const pacmanCanvas = document.getElementById('pacman-game');
const pacmanCtx = pacmanCanvas.getContext('2d');

function drawPacman() {
    pacmanCtx.clearRect(0, 0, pacmanCanvas.width, pacmanCanvas.height); // Clear the canvas
    pacmanCtx.beginPath();
    pacmanCtx.arc(100, 100, 50, 0.25 * Math.PI, 1.75 * Math.PI); // Draw Pac-Man's mouth
    pacmanCtx.lineTo(100, 100);
    pacmanCtx.fillStyle = 'yellow';
    pacmanCtx.fill();
    pacmanCtx.closePath();
}

drawPacman(); // Draw Pac-Man on the canvas


// Snake Game Logic
const snakeCanvas = document.getElementById('snake-game');
const snakeCtx = snakeCanvas.getContext('2d');

let snake = [{ x: 150, y: 150 }]; // Initial position of the snake
let direction = { x: 0, y: 0 }; // Movement direction
let food = { x: 30, y: 30 }; // Food position

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
    snake = [{ x: 150, y: 150 }];
    direction = { x: 0, y: 0 };
    food = { x: 30, y: 30 };
}

function gameLoop() {
    updateSnake();
    drawSnake();
    drawFood();
    requestAnimationFrame(gameLoop); // Continuous animation loop
}

document.addEventListener('keydown', event => {
    // Change direction based on arrow key presses
    if (event.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -10 };
    if (event.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: 10 };
    if (event.key === 'ArrowLeft' && direction.x === 0) direction = { x: -10, y: 0 };
    if (event.key === 'ArrowRight' && direction.x === 0) direction = { x: 10, y: 0 };
});

gameLoop(); // Start the game loop
