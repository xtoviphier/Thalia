// Snake Game Logic
const snakeCanvas = document.getElementById('snake-game');
if (!snakeCanvas) {
    console.error('Canvas element not found!');
}

const snakeCtx = snakeCanvas.getContext('2d');

let snake = [{ x: 100, y: 100 }]; // Initial position of the snake
let direction = { x: 0, y: 0 }; // Movement direction
let food = { x: 30, y: 30 }; // Food position
let speed = 5; // Reduced speed (half the original)

// Game state
let gameStarted = false; // Track whether the game has started

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
    gameStarted = false; // Reset the game state
    const startOverlay = document.getElementById('start-overlay');
    startOverlay.style.display = 'flex'; // Show the overlay
}

function gameLoop() {
    if (gameStarted) {
        updateSnake();
        drawSnake();
        drawFood();
    }
    requestAnimationFrame(gameLoop); // Continuous animation loop
}

// Start the game when the overlay is clicked
const startOverlay = document.getElementById('start-overlay');
startOverlay.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true; // Explicitly set the game state to started
        startOverlay.style.display = 'none'; // Hide the overlay
        console.log('Game started!'); // Debugging log to confirm the game starts
    }
});

gameLoop(); // Start the game loop
