let timer;
let currentTime = 0;
let isRunning = false;

const timerContainer = document.getElementById("timer-container");

const timerDisplay = document.getElementById('timer');
const bellSound = new Audio("bell.mp3");
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const moreBtn = document.getElementById("more");
const lessBtn = document.getElementById("less");

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
moreBtn.addEventListener("click",moreTimer);
lessBtn.addEventListener("click",lessTimer);


function startTimer() {
    if (isRunning) return;

    const timerSectionsLength = getTimerSections().timerSectionsLength;

    const timeList = new Array(timerSectionsLength).fill(0).map((_,index) => {
      const minutes = validateInput(document.getElementById(`min-input-${index+1}`).value);
      const seconds = validateInput(document.getElementById(`sec-input-${index+1}`).value);
      return  minutes*60 + seconds;
    });

    const countList = new Array(timerSectionsLength).fill(0).map((_, index) => {
      return validateInput(document.getElementById(`count-input-${index+1}`).value) || 1;
    });

    if(!timeList[0]) return;

    console.log(timeList, countList);

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

function moreTimer() {
  function createLabel(forAttr, text) {
    const label = document.createElement('label');
    label.setAttribute('for', forAttr);
    label.textContent = text;
    return label;
  }

  function createInput(id, type, min, placeholder) {
    const input = document.createElement('input');
    input.setAttribute('id', id);
    input.setAttribute('type', type);
    input.setAttribute('min', min);
    if (placeholder) {
        input.setAttribute('placeholder', placeholder);
    }
    return input;
  }

  const nextSectionIndex = getTimerSections().timerSectionsLength + 1;

  const section = document.createElement('section');
  section.id = `time-${nextSectionIndex}`;
  section.className = "timer-section";

  const div1 = document.createElement('div');
  div1.appendChild(createLabel(`min-input-${nextSectionIndex}`, `時間${nextSectionIndex}`));
  div1.appendChild(document.createElement('br'));
  div1.appendChild(createLabel(`min-input-${nextSectionIndex}`, '分：'));
  div1.appendChild(createInput(`min-input-${nextSectionIndex}`, 'number', '0', 'minutes'));
  div1.appendChild(document.createElement('br'));
  div1.appendChild(createLabel(`sec-input-${nextSectionIndex}`, '秒：'));
  div1.appendChild(createInput(`sec-input-${nextSectionIndex}`, 'number', '0', 'seconds'));

  const div2 = document.createElement('div');
  div2.appendChild(createLabel(`count-input-${nextSectionIndex}`, 'ベルの回数:'));
  div2.appendChild(createInput(`count-input-${nextSectionIndex}`, 'number', '0'));
  div2.lastChild.setAttribute('max', '5'); // Set max attribute for the last input element

  section.appendChild(div1);
  section.appendChild(div2);

  timerContainer.appendChild(section);

}

function lessTimer(){
  const {timerSections, timerSectionsLength }= getTimerSections();
  if(timerSectionsLength <= 1) return;
  const lastTimerSection = timerSections[timerSectionsLength - 1];
  lastTimerSection.remove();
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

function validateInput(value) {
  const parsedValue = parseInt(value, 10);
  return isNaN(parsedValue) ? 0 : Math.max(0, parsedValue);
}

function getTimerSections () {
  const timerSections = document.getElementsByClassName("timer-section");
  const timerSectionsLength = timerSections.length;
  return {timerSections, timerSectionsLength};
}