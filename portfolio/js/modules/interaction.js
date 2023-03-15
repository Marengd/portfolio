// Get all cube elements
const cubes = document.querySelectorAll('.cube');

// Function to handle the mouseleave event
function handleMouseLeave() {
  // Get the current rotation of the cube
  const currentRotation = getComputedStyle(this).transform;

  // Pause the rotating animation
  this.style.animationPlayState = 'paused, running';

  // Remove the current transform after the returnToOriginal animation finishes
  setTimeout(() => {
    this.style.transform = '';
    this.style.animationPlayState = 'paused, paused';
  }, 500);
}

// Add event listeners to each cube
cubes.forEach((cube) => {
  cube.addEventListener('mouseleave', handleMouseLeave);
});

