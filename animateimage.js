const numImages = 12; // Number of images
const images = [];
const myimage = ['a.jpeg', 'b.jpeg', 'c.jpeg', 'd.jpeg', 'e.jpeg', 'f.jpeg', 'g.jpeg', 'h.jpeg', 'i.jpeg', 'k.jpeg', 'k.jpeg', 'l.jpeg'];
const visibleImages = 5; // Number of images to be visible at a time
const interval = 5000; // Interval for image change in milliseconds

// Create and append images to the body
for (let i = 0; i < numImages; i++) {
  const image = document.createElement("img");
  image.src = 'images/' + myimage[i]; // Replace with the image sources
  image.alt = "Floating Image";
  image.className = "image";
  image.style.position = 'absolute';
  image.style.width = '70px';
  image.style.height = '70px';
  image.style.visibility = "hidden";
  image.style.borderRadius = "50%"; // Make the image round
  document.body.appendChild(image);
  images.push(image);
  
  window.addEventListener('resize', () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const currentX = parseFloat(image.style.left);
    const currentY = parseFloat(image.style.top);

    image.style.left = `${Math.min(currentX, screenWidth - parseFloat(image.style.width))}px`;
    image.style.top = `${Math.min(currentY, screenHeight - parseFloat(image.style.height))}px`;
});
}

// Randomize initial positions and directions for visible images
function randomizePositions() {
  const visibleIndices = new Set();
  while (visibleIndices.size < visibleImages) {
    const randomIndex = Math.floor(Math.random() * numImages);
    visibleIndices.add(randomIndex);
  }

  images.forEach((image, index) => {
    const maxX = window.innerWidth - image.clientWidth;
    const maxY = window.innerHeight - image.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    image.style.left = randomX + "px";
    image.style.top = randomY + "px";

    if (visibleIndices.has(index)) {
      image.style.visibility = "visible";
    } else {
      image.style.visibility = "hidden";
    }

    const randomDirectionX = Math.random() > 0.5 ? 1 : -1;
    const randomDirectionY = Math.random() > 0.5 ? 1 : -1;
    image.directionX = randomDirectionX;
    image.directionY = randomDirectionY;
  });
}

// Toggle visibility of random images every 5 seconds
function toggleVisibility() {
  setInterval(() => {
    const hiddenImages = images.filter(
      (image) => image.style.visibility === "hidden"
    );
    const visibleImages = images.filter(
      (image) => image.style.visibility === "visible"
    );

    if (hiddenImages.length >= visibleImages.length) {
      const randomIndices = [];
      while (randomIndices.length < visibleImages.length) {
        const randomIndex = Math.floor(Math.random() * hiddenImages.length);
        if (!randomIndices.includes(randomIndex)) {
          randomIndices.push(randomIndex);
        }
      }

      randomIndices.forEach((index) => {
        hiddenImages[index].style.visibility = "visible";
      });

      visibleImages.forEach((image) => {
        image.style.transition = "opacity 1s";
        image.style.opacity = 0;

        // Adjust image position
        const currentX = parseFloat(image.style.left);
        const currentY = parseFloat(image.style.top);
        const deltaY = Math.floor(Math.random() * 50) + 10; // Adjust this value according to your preference
        image.style.top = currentY - deltaY + "px"; // Move the image up by deltaY pixels

        setTimeout(() => {
          image.style.visibility = "hidden";
          image.style.opacity = 1;
        }, interval);
      });
    }
  }, interval);
}

// Update image positions and handle collisions
function updateImagePositions() {
  images.forEach((image) => {
    const currentX = parseFloat(image.style.left);
    const currentY = parseFloat(image.style.top);
    const maxX = window.innerWidth - image.clientWidth;
    const maxY = window.innerHeight - image.clientHeight;

    const newX = currentX + image.directionX;
    const newY = currentY + image.directionY;
    image.style.left = newX + "px";
    image.style.top = newY + "px";

    if (newX < 0 || newX > maxX) {
      image.directionX *= -1;
    }
    if (newY < 0 || newY > maxY) {
      image.directionY *= -1;
    }
  });

  requestAnimationFrame(updateImagePositions);
}

// Initialize
randomizePositions();
toggleVisibility();
updateImagePositions();