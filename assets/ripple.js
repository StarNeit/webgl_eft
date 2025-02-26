function createRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.classList.add('ripple');

  const rippleSize = 80; // you can adjust this value
  ripple.style.width = `${rippleSize}px`;
  ripple.style.height = `${rippleSize}px`;

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

// Add event listeners for mouse down, up, and move
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

// Listen for mouse movement while the mouse is pressed
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