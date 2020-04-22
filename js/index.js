console.log("Inside index.js");

let timeContainer = document.querySelector(".time-container");
let timeText = document.querySelector(".time-text");
let sessionText = document.querySelector(".session-text");
let messageText = document.querySelector(".message-text");
let breakText = document.querySelector(".break-text");

const WORK_TIME = "Work Time! Focus";
const BREAK_TIME = "Break Time!";
const BREAK_TIME_FINISH = "Break Finished!";
// timeText.innerHTML = "25 : 00";
// sessionText.innerHTML = "25";
// breakText.innerHTML = "5"

timeText.innerHTML = "01 : 00";
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

function startTimer() {
  if (startFlag) {
    // To call this function every second
    interval = setInterval(updateCountdown, 1000);
    messageText.innerHTML = WORK_TIME;
    startFlag = false;
  }
}

function stopTimer() {
  startFlag = true;
  clearInterval(interval);
}

function resetTimer() {
  console.log("In reset");
  clearInterval(interval);
  time = startingMinutes * 60;
  interval = 0;
  timeText.innerHTML = `${sessionText.innerHTML} : ${"00"}`;
  time = Number(sessionText.innerHTML) * 60;
  startFlag = true;
  messageText.innerHTML = "";
}

function increaseBreak() {
  console.log("insertBreak");
  if (currentBreak === 60) {
    return;
  }

  currentBreak++;
  console.log("What is currentBreak:: " + currentBreak);
  breakText.innerHTML = currentBreak;
}

function decreaseBreak() {
  console.log("decreaseBreak");
  if (currentBreak === 1) {
    return;
  }

  currentBreak--;
  console.log("What is currentBreak:: " + currentBreak);
  breakText.innerHTML = currentBreak;
}

function increaseSession() {
  if (currentSession === 60) {
    return;
  }

  currentSession++;
  console.log("what is currentSession:: " + currentSession);
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
  console.log("Ehat is time:: " + time);
}

function updateCountdown() {
  console.log("updateCountdown");
  console.log("What is time:: " + time);
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0 && seconds === "00") {
      messageText.innerHTML = BREAK_TIME;
      timeText.innerHTML = "";

      updateCountdownBreak();
      return;
  }

  console.log("minutes:: " + minutes);
  console.log("seconds:: " + seconds);
  timeText.innerHTML = `${minutes} : ${seconds}`;
  timeContainer.append(timeText);

  time--;
}

function updateCountdownBreak() {
  console.log("updateCountdownBreak");
  console.log("What is breakTime:: " + breakTime);
  const minutes = Math.floor(breakTime / 60);
  let seconds = breakTime % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 0 && seconds === "00") {
    messageText.innerHTML = BREAK_TIME_FINISH;
    return;
  }

  console.log("minutes:: " + minutes);
  console.log("seconds:: " + seconds);

  timeText.innerHTML = `${minutes} : ${seconds}`;
  timeContainer.append(timeText);

  breakTime--;
}
