function createRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.classList.add('ripple');

  const rippleSize = 80; // you can adjust this value
  ripple.style.width = `${rippleSize}px`;
  ripple.style.height = `${rippleSize}px`;
  ripple.style.backgroundColor = 'rgba(0, 228, 255, 0.7)'; // Adding cyan color directly

  ripple.style.left = `${x - rippleSize / 2}px`; // Centering the ripple
  ripple.style.top = `${y - rippleSize / 2}px`; // Centering the ripple

  document.getElementById('main-content').appendChild(ripple);

  // Remove the ripple after the animation ends
  ripple.addEventListener('animationend', () => {
    ripple.remove();
  });
}

// Track if the mouse is pressed
let isMousePressed = false;
let isMouseMoved = false;

document.getElementById('body').addEventListener('mousedown', (event) => {
  isMousePressed = true;
  createRipple(event.pageX, event.pageY);

  const continuousRipple = setInterval(() => {
    if (isMousePressed && !isMouseMoved) {
      createRipple(event.pageX, event.pageY);
    } else {
      clearInterval(continuousRipple);
    }
  }, 100);
});

// Add click event handler
document.getElementById('body').addEventListener('click', (event) => {
  // Create a small random movement to trigger animation
  const randomX = event.pageX + (Math.random() - 0.5) * 10;
  const randomY = event.pageY + (Math.random() - 0.5) * 10;
  createRipple(randomX, randomY);
});

document.getElementById('body').addEventListener('mousemove', (event) => {
  if (isMousePressed) {
    isMouseMoved = true;
    createRipple(event.pageX, event.pageY); // Create ripples at new mouse position
  }
});

document.addEventListener('mouseup', () => {
  isMouseMoved = false;
  isMousePressed = false; // Stop creating ripples when the mouse is released
});  