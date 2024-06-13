let timer;
let currentTime = 0;
let isRunning = false;

const timeMinInput1 = document.getElementById('min-input-1');
const timeSecInput1 = document.getElementById('sec-input-1');
const countInput1 = document.getElementById('count-input-1');

const timeMinInput2 = document.getElementById('min-input-2');
const timeSecInput2 = document.getElementById('sec-input-2');
const countInput2 = document.getElementById('count-input-2');

const timeMinInput3 = document.getElementById('min-input-3');
const timeSecInput3 = document.getElementById('sec-input-3');
const countInput3 = document.getElementById('count-input-3');

const timeMinInput4 = document.getElementById('min-input-4');
const timeSecInput4 = document.getElementById('sec-input-4');
const countInput4 = document.getElementById('count-input-4');

const timerDisplay = document.getElementById('timer');
const bellSound = new Audio("bell.mp3");
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

function startTimer() {
    if (isRunning) return;

    const time1 = (parseInt(timeMinInput1.value) || 0)*60 + (parseInt(timeSecInput1.value) || 0);
    const count1 = parseInt(countInput1.value) || 1;

    if (time1 <= 0 || count1 <= 0) return;

    const time2 = (parseInt(timeMinInput2.value) || 0)*60 + (parseInt(timeSecInput2.value))
    const count2 = parseInt(countInput2.value) || 1;

    const time3 = (parseInt(timeMinInput3.value) || 0)*60 + (parseInt(timeSecInput3.value))
    const count3 = parseInt(countInput3.value) || 1;

    const time4 = (parseInt(timeMinInput4.value) || 0)*60 + (parseInt(timeSecInput4.value))
    const count4 = parseInt(countInput4.value) || 1;

    const timeList = [time1, time2, time3, time4];
    const countList = [count1,count2,count3, count4];

    isRunning = true;
    currentTime = 0;

    timer = setInterval(async() => {
        currentTime++;
        timerDisplay.textContent = currentTime <= 60 ? `${currentTime}秒` : `${Math.floor(currentTime / 60)}分${currentTime % 60}秒` ;

      const index = timeList.indexOf(currentTime);
        if(index !== -1){
          await ringBell(countList[index]);
        }
        
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    currentTime = 0;
    timerDisplay.textContent = '0秒';
}

async function ringBell(count) {
  let waitTime = count == 1 ? 2000 : count == 2 ? 900 : 550; 
  for(let i = 0; i < count; i ++){
    if(i === count - 1) waitTime = 2000;
    bellSound.play();
    await new Promise(resolve => setTimeout(resolve,waitTime));
    bellSound.pause();
    bellSound.currentTime = 0;
  }

}
