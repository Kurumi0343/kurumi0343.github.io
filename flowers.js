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

function createFlower() {
    const flower = document.createElement('img');
    flower.src = 'images/flower.png';
    flower.style.position = 'absolute';
    flower.style.width = '6vw';
    flower.style.height = '6vw';
    const maxX = window.innerWidth - flower.clientWidth;
    const maxY = window.innerHeight - flower.clientHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    flower.style.left = randomX + "px";
    flower.style.top = randomY + "px";

    const speed = getRandomSpeed();
    const angle = getRandom(0, 2 * Math.PI);

    document.body.appendChild(flower);

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
