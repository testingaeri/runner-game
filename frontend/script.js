let gameContainer = document.getElementById('game');
let scoreBoard = document.getElementById('scoreBoard');
let obstacles = [];
let score = 0;
let gameInterval;
let obstacleInterval;

function startGame() {
    score = 0;
    scoreBoard.textContent = `Score: ${score}`;
    obstacles.forEach(obs => obs.remove());
    obstacles = [];
    
    gameInterval = setInterval(updateGame, 20);
    obstacleInterval = setInterval(createObstacle, 1000);
}

function updateGame() {
    score++;
    scoreBoard.textContent = `Score: ${score}`;

    obstacles.forEach((obs, index) => {
        obs.style.left = (obs.offsetLeft - 5) + 'px';

        if (obs.offsetLeft < 0) {
            obs.remove();
            obstacles.splice(index, 1);
        }

        if (checkCollision(obs)) {
            clearInterval(gameInterval);
            clearInterval(obstacleInterval);
            saveScore();
            alert('Game Over! Your score: ' + score);
        }
    });
}

function createObstacle() {
    let obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = '600px';
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);
}

function checkCollision(obstacle) {
    let player = { left: 30, right: 60, bottom: 30 }; // Example player dimensions
    let obsRect = obstacle.getBoundingClientRect();
    return !(player.right < obsRect.left || 
             player.left > obsRect.right || 
             player.bottom < obsRect.top || 
             player.top > obsRect.bottom);
}

function saveScore() {
    const username = prompt('Enter your name:');
    fetch('http://localhost:3000/scores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, score }),
    });
}

document.getElementById('startBtn').addEventListener('click', startGame);
