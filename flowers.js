function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomPosition() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const x = getRandom(0, screenWidth);
    const y = getRandom(0, screenHeight);

    return { x, y };
}

function getRandomSpeed() {
    const minSpeed = 1;
    const maxSpeed = 3;

    return getRandom(minSpeed, maxSpeed);
}

function isColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

function createFlower() {
    const flower = document.createElement('img');
    flower.src = 'images/flower.png';
    flower.style.position = 'absolute';
    flower.style.width = '30px';
    flower.style.height = '30px';

    const position = getRandomPosition();
    flower.style.left = `${position.x}px`;
    flower.style.top = `${position.y}px`;

    const speed = getRandomSpeed();
    const angle = getRandom(0, 2 * Math.PI);

    document.body.appendChild(flower);

    window.addEventListener('resize', () => {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const currentX = parseFloat(flower.style.left);
        const currentY = parseFloat(flower.style.top);

        flower.style.left = `${Math.min(currentX, screenWidth - parseFloat(flower.style.width))}px`;
        flower.style.top = `${Math.min(currentY, screenHeight - parseFloat(flower.style.height))}px`;
    });

    function moveFlower() {
        const dx = speed * Math.cos(angle);
        const dy = speed * Math.sin(angle);

        const rect = flower.getBoundingClientRect();
        const newX = rect.left + dx;
        const newY = rect.top + dy;

        flower.style.left = `${newX}px`;
        flower.style.top = `${newY}px`;
        const maxX = window.innerWidth - flower.clientWidth;
        const maxY = window.innerHeight - flower.clientHeight;
    
        // Remove the flower if it goes off-screen
        if (newX < 0 || newX > maxX) {
            document.body.removeChild(flower);
          }
        if (newY < 0 || newY > maxY) {
            document.body.removeChild(flower);
        }

        requestAnimationFrame(moveFlower);
    }

    moveFlower();
}

setInterval(() => {
    createFlower();
}, 400);
