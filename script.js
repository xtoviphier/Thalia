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

// Scale canvas for responsiveness
function resizeCanvas() {
    const scaleFactor = window.innerWidth < 600 ? 0.8 : 1; // Scale down for small screens
    snakeCanvas.width = 400 * scaleFactor;
    snakeCanvas.height = 400 * scaleFactor;

    // Redraw the game after resizing
    drawSnake();
    drawFood();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Call once on page load

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
    resizeCanvas(); // Ensure canvas resets properly
}

function gameLoop() {
    updateSnake();
    drawSnake();
    drawFood();
    requestAnimationFrame(gameLoop); // Continuous animation loop
}

// Arrow key controls (for desktop users)
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp' && direction.y === 0) direction = { x: 0, y: -speed };
    if (event.key === 'ArrowDown' && direction.y === 0) direction = { x: 0, y: speed };
    if (event.key === 'ArrowLeft' && direction.x === 0) direction = { x: -speed, y: 0 };
    if (event.key === 'ArrowRight' && direction.x === 0) direction = { x: speed, y: 0 };
});

// Touch controls (for mobile users)
snakeCanvas.addEventListener('touchstart', (event) => {
    console.log('Touch started'); // Debugging log
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
});

snakeCanvas.addEventListener('touchend', (event) => {
    console.log('Touch ended'); // Debugging log
    const touch = event.changedTouches[0];
    const endX = touch.clientX;
    const endY = touch.clientY;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    console.log(`DeltaX: ${deltaX}, DeltaY: ${deltaY}`); // Debugging log

    // Detect swipe direction with a smaller threshold
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 20 && direction.x === 0) direction = { x: speed, y: 0 }; // Swipe right
        if (deltaX < -20 && direction.x === 0) direction = { x: -speed, y: 0 }; // Swipe left
    } else {
        // Vertical swipe
        if (deltaY > 20 && direction.y === 0) direction = { x: 0, y: speed }; // Swipe down
        if (deltaY < -20 && direction.y === 0) direction = { x: 0, y: -speed }; // Swipe up
    }
});

gameLoop(); // Start the game loop
