let timerInterval;
let isRunning = false;
let elapsedTime = 0;
let lapCount = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startPauseButton = document.getElementById('startPauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsList = document.getElementById('lapsList');

function updateDisplay()
 {
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    millisecondsDisplay.textContent = milliseconds.toString().padStart(2, '0');
}

function startPauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPauseButton.textContent = 'Start';
    } else {
        const startTime = Date.now() - elapsedTime;

        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);

        startPauseButton.textContent = 'Pause';
    }

    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    updateDisplay();
    startPauseButton.textContent = 'Start';
    lapsList.innerHTML = '';
}

function addLap() {
    if (!isRunning) return;

    const minutes = minutesDisplay.textContent;
    const seconds = secondsDisplay.textContent;
    const milliseconds = millisecondsDisplay.textContent;

    const lapTime = `${minutes}:${seconds}:${milliseconds}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;

    lapsList.appendChild(lapItem);
}

// Event Listeners
startPauseButton.addEventListener('click', startPauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);
