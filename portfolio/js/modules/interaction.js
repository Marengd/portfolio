// Get all cube elements
const cubes = document.querySelectorAll('.cube');

// Function to handle the mouseleave event
function handleMouseLeave() {
  // Get the current rotation of the cube
  const currentRotation = getComputedStyle(this).transform;

  // Pause the animation
  this.style.animationPlayState = 'paused';

  // Apply the current rotation as inline style to keep the cube in its current position
  this.style.transform = currentRotation;
}

// Add event listeners to each cube
cubes.forEach((cube) => {
  cube.addEventListener('mouseleave', handleMouseLeave);
});
