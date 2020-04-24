console.log("Inside index.js");

let timeContainer = document.querySelector(".time-container");
let timeText = document.querySelector(".time-text");
let sessionText = document.querySelector(".session-text");
let messageText = document.querySelector(".message-text");
let breakText = document.querySelector(".break-text");

const WORK_TIME = "Work Time! Focus";
const BREAK_TIME = "Break Time!";
const BREAK_TIME_FINISH = "Break Finished!";
const FINISHED = "You have finished four sets of work! Congrats!";
// timeText.innerHTML = "25 : 00";
// sessionText.innerHTML = "25";
// breakText.innerHTML = "5"

timeText.innerHTML = "1 : 00";
sessionText.innerHTML = "1";
breakText.innerHTML = "1"


// Variables for Work Time
// let startingMinutes = 25;
let startingMinutes = 1;
let time = startingMinutes * 60;
let interval = 0;
let currentSession = Number(sessionText.innerHTML);

// Variables for Break Time
// let startingBreakMinutes = 5;
let startingBreakMinutes = 1;
let breakTime = startingBreakMinutes * 60;
let intervalBreak = 0;
let currentBreak = Number(breakText.innerHTML);

// For handling starting the timer
let startFlag = true;
let breakFlag = true;

// To keep track of sets
let checkmark = 0;

function startTimer() {
  console.log("Inside startTime()");

  if (startFlag) {
    console.log("Inside flag");

    // To call this function every second
    interval = setInterval(updateCountdown, 1000);
    messageText.innerHTML = WORK_TIME;
    startFlag = false;
  }
}

function stopTimer() {
  console.log("Inside stopTimer()");

  startFlag = true;
  clearInterval(interval);
}

function resetTimer() {
  console.log("Inside resetTimer()");

  clearInterval(interval);
  time = startingMinutes * 60;
  interval = 0;
  timeText.innerHTML = `${sessionText.innerHTML} : ${"00"}`;
  time = Number(sessionText.innerHTML) * 60;
  startFlag = true;
  messageText.innerHTML = "";
}

function startBreak() {
  console.log("Inside startBreak()");

  intervalBreak = setInterval(updateCountdownBreak, 1000);
  messageText.innerHTML = BREAK_TIME;
}

function stopBreak() {
  console.log("Inside stopBreak()");

  clearInterval(intervalBreak);
}

function resetBreak() {
  console.log("In resetBreak()");

  clearInterval(intervalBreak);
  intervalBreak = 0;
  timeText.innerHTML = `${breakText.innerHTML} : ${"00"}`;
  breakTime = Number(breakText.innerHTML) * 60;
  console.log("What is time:: " + breakTime);
  breakFlag = true;
  messageText.innerHTML = "";
}

function updateCountdown() {
  console.log("Inside updateCountdown()");
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  console.log("minutes:: " + minutes);
  console.log("seconds:: " + seconds);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0 && seconds === "00") {
    console.log("Break time Start");
    timeText.innerHTML = "";
    changeCircleColor();
    checkmark++;
    console.log("What is checkmark::" + checkmark);
    stopTimer();
    resetTimer();
    resetBreak();
    startBreak();
    return;
  }

  checkForFinishedSet();

  timeText.innerHTML = `${minutes} : ${seconds}`;
  timeContainer.append(timeText);

  time--;
}


function updateCountdownBreak() {
  console.log("Inside updateCountdownBreak()");

  const minutes = Math.floor(breakTime / 60);
  let seconds = breakTime % 60;

  console.log("minutes:: " + minutes);
  console.log("seconds:: " + seconds);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0 && seconds === "00") {
    console.log("Break Time Finished. Start another set of work");

    startFlag = true;
    stopBreak();
    resetBreak();
    resetTimer();
    startTimer();
    return;
  }

  timeText.innerHTML = `${minutes} : ${seconds}`;
  timeContainer.append(timeText);

  breakTime--;
}


function checkForFinishedSet() {
  console.log("Inside checkForFinishedSet()");

  if (checkmark === 4) {
    console.log("Checkmark is 4.");
    resetTimer();
    resetBreak();
    messageText.innerHTML = FINISHED;
    return;
  }
}

function changeCircleColor() {
  console.log("Inside changeCircleColor");
  console.log("What is checkmark::" + checkmark);
  let circle = document.querySelector(".circle" + "-" + checkmark);
  console.log("circle:: " + circle);
  // circle.classList.add("circle" + checkmark);
  circle.setAttribute("style", "background-color: coral");
  // document.documentElement.style.setProperty("--circleColor", 'coral');
}

function increaseBreak() {
  console.log("insertBreak");
  if (currentBreak === 60) {
    return;
  }

  currentBreak++;
  breakText.innerHTML = currentBreak;
}

function decreaseBreak() {
  console.log("decreaseBreak");
  if (currentBreak === 1) {
    return;
  }

  currentBreak--;
  breakText.innerHTML = currentBreak;
}

function increaseSession() {
  if (currentSession === 60) {
    return;
  }

  currentSession++;
  sessionText.innerHTML = currentSession;
  timeText.innerHTML = `${currentSession} : ${"00"}`;
  time = currentSession * 60;
}

function decreaseSession() {
  console.log("in decreaseSession()");
  if (currentSession === 1) {
    return;
  }

  currentSession--;
  sessionText.innerHTML = currentSession;
  timeText.innerHTML = `${currentSession} : ${"00"}`;
  time = currentSession * 60;
}
