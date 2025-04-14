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

// Variables for touch controls
let startX = 0;
let startY = 0;

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
    gameStarted = false; // Reset the game state
    const startOverlay = document.getElementById('start-overlay');
    startOverlay.textContent = 'Click to Start'; // Reset the overlay text
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

// Arrow key controls (for desktop users)
document.addEventListener('keydown', event => {
    if (!gameStarted) return; // Ignore key presses until the game starts
    if (event.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -speed };
    if (event.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: speed };
    if (event.key === 'ArrowLeft' && direction.x === 0) direction = { x: -speed, y: 0 };
    if (event.key === 'ArrowRight' && direction.x === 0) direction = { x: speed, y: 0 };
});

// Touch controls (for mobile users)
snakeCanvas.addEventListener('touchstart', (event) => {
    if (!gameStarted) return; // Ignore touch events until the game starts
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
});

snakeCanvas.addEventListener('touchend', (event) => {
    if (!gameStarted) return; // Ignore touch events until the game starts
    const touch = event.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // Detect swipe direction with a smaller threshold (10px instead of 20px)
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 10 && direction.x === 0) direction = { x: speed, y: 0 }; // Swipe right
        if (deltaX < -10 && direction.x === 0) direction = { x: -speed, y: 0 }; // Swipe left
    } else {
        // Vertical swipe
        if (deltaY > 10 && direction.y === 0) direction = { x: 0, y: speed }; // Swipe down
        if (deltaY < -10 && direction.y === 0) direction = { x: 0, y: -speed }; // Swipe up
    }
});

// Start the game when the overlay is clicked
const startOverlay = document.getElementById('start-overlay');
startOverlay.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true; // Start the game
        startOverlay.style.display = 'none'; // Hide the overlay
    }
});

// Reset the game when clicking outside the canvas (handles both click and touch events)
document.addEventListener('click', (event) => {
    if (!snakeCanvas.contains(event.target)) {
        resetGame(); // Reset the game state
    }
});

document.addEventListener('touchstart', (event) => {
    if (!snakeCanvas.contains(event.target)) {
        resetGame(); // Reset the game state for touch devices
    }
});

gameLoop(); // Start the game loop
