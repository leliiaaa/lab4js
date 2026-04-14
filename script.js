const startBtn = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty');
const colorSelect = document.getElementById('color');
const gameField = document.getElementById('game-field');
const pixel = document.getElementById('pixel');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const setupDiv = document.getElementById('setup');
const infoDiv = document.getElementById('game-info');

let score = 0;
let timeLeft;
let gameTimer;
let currentDifficulty;

// Налаштування складності
const settings = {
    lazy: { time: 4, size: 60 },
    normal: { time: 2, size: 40 },
    catchme: { time: 1, size: 20 }
};

startBtn.addEventListener('click', () => {
    const diff = difficultySelect.value;
    const color = colorSelect.value;

    if (!diff || !color) {
        alert("Оберіть усі параметри!");
        return;
    }

    currentDifficulty = settings[diff];
    
    pixel.style.backgroundColor = color;
    pixel.style.width = currentDifficulty.size + 'px';
    pixel.style.height = currentDifficulty.size + 'px';

    setupDiv.style.display = 'none';
    gameField.style.display = 'block';
    infoDiv.style.display = 'block';

    spawnPixel();
});

function spawnPixel() {
    clearTimeout(gameTimer);

    const x = Math.floor(Math.random() * (gameField.clientWidth - currentDifficulty.size));
    const y = Math.floor(Math.random() * (gameField.clientHeight - currentDifficulty.size));

    pixel.style.left = x + 'px';
    pixel.style.top = y + 'px';
    pixel.style.display = 'block';

    timeLeft = currentDifficulty.time;
    updateTimer();
}

function updateTimer() {
    timerDisplay.textContent = timeLeft;
    
    if (timeLeft <= 0) {
        gameOver();
    } else {
        timeLeft--;
        gameTimer = setTimeout(updateTimer, 1000);
    }
}

pixel.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    spawnPixel(); 
});

function gameOver() {
    pixel.style.display = 'none';
    alert(`Гра закінчена! Ваш рахунок: ${score}.`);
    location.reload(); 
}
