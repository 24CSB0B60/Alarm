const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour12: true });
  const date = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  timeElement.textContent = time;
  dateElement.textContent = date;
}
setInterval(updateClock, 1000);
updateClock();

let alarmTime = null;
let alarmTimeout = null;

document.getElementById('setAlarm').addEventListener('click', () => {
  const alarmInput = document.getElementById('alarmTime').value;
  if (alarmInput) {
    alarmTime = alarmInput;
    alert(`Alarm set for ${alarmTime}`);
  }
});

document.getElementById('clearAlarm').addEventListener('click', () => {
  alarmTime = null;
  clearTimeout(alarmTimeout);
  alert('Alarm cleared');
});

function checkAlarm() {
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);
  if (alarmTime === currentTime) {
    alert('Alarm ringing!');
    alarmTime = null; 
  }
}
setInterval(checkAlarm, 1000);

let stopwatchInterval = null;
let stopwatchTime = 0;

const stopwatchDisplay = document.getElementById('stopwatchDisplay');
document.getElementById('startStopwatch').addEventListener('click', () => {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      const hours = String(Math.floor(stopwatchTime / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, '0');
      const seconds = String(stopwatchTime % 60).padStart(2, '0');
      stopwatchDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);
  }
});

document.getElementById('pauseStopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
});

document.getElementById('resetStopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchTime = 0;
  stopwatchDisplay.textContent = '00:00:00';
});

let countdownInterval = null;

document.getElementById('startCountdown').addEventListener('click', () => {
  const minutes = parseInt(document.getElementById('countdownMinutes').value, 10);
  if (isNaN(minutes) || minutes <= 0) {
    alert('Please enter a valid number of minutes');
    return;
  }

  let countdownTime = minutes * 60;
  countdownInterval = setInterval(() => {
    const mins = String(Math.floor(countdownTime / 60)).padStart(2, '0');
    const secs = String(countdownTime % 60).padStart(2, '0');
    document.getElementById('countdownDisplay').textContent = `${mins}:${secs}`;
    countdownTime--;

    if (countdownTime < 0) {
      clearInterval(countdownInterval);
      alert('Countdown finished!');
    }
  }, 1000);
});

document.getElementById('lightTheme').addEventListener('click', () => {
  document.body.className = '';
});

document.getElementById('darkTheme').addEventListener('click', () => {
  document.body.className = 'dark';
});

document.getElementById('customTheme').addEventListener('click', () => {
  document.body.className = 'custom';
});