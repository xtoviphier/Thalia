// Touch controls (for mobile users)
snakeCanvas.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Prevent default touch behavior
    console.log('Touch started'); // Debugging log
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
});

snakeCanvas.addEventListener('touchend', (event) => {
    event.preventDefault(); // Prevent default touch behavior
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
