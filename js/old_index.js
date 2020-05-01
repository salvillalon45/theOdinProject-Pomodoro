// console.log("Inside old_index.js");
//
// let timeContainer = document.querySelector(".time-container");
// let timeText = document.querySelector(".time-text");
// let sessionText = document.querySelector(".session-text");
// let messageText = document.querySelector(".message-text");
// let breakText = document.querySelector(".break-text");
// let longBreakText = document.querySelector(".long-break-text");
//
// const WORK_TIME = "Work Time! Focus";
// const BREAK_TIME = "Break Time!";
// const LONG_BREAK_TIME = "Long Break Time!";
// const FINISHED = "You have finished four sets of work! Congrats!";
// // timeText.innerHTML = "25 : 00";
// // sessionText.innerHTML = "25";
// // breakText.innerHTML = "5"
// // longBreakText.innerHTML = "10"
//
// timeText.innerHTML = "1 : 00";
// sessionText.innerHTML = "1";
// breakText.innerHTML = "1";
// longBreakText.innerHTML = "1";
//
//
// // Variables for Work Time
// // let startingMinutes = 25;
// let startingMinutes = 0.30;
// let time = startingMinutes * 60;
// let interval = 0;
// let currentSession = Number(sessionText.innerHTML);
//
// // Variables for Break Time
// // let startingBreakMinutes = 5;
// let startingBreakMinutes = 1;
// let breakTime = startingBreakMinutes * 60;
// let intervalBreak = 0;
// let currentBreak = Number(breakText.innerHTML);
//
// // Variables for Long Break Time
// // let startingLongBreakMinutes = 10;
// let startingLongBreakMinutes = 1;
// let longBreakTime = startingLongBreakMinutes * 60;
// let intervalLongBreak = 0;
// let currentLongBreak = Number(longBreakText.innerHTML);
//
// // For handling starting the timer
// // let startFlag = true;
// // let breakTimeFlag = false;
// // let breakTimeStart = false;
// // let breakOverFlag = false;
// // let sessionTimeFlag = false;
//
// // Activated when it is work session
// let workTimeFlag = false;
// // Activated when it is break session
// let breakTimeFlag = false;
// // Activated when it is paused session
// let isPausedFlag = false;
//
// // To keep track of sets
// let checkmark = 0;
//
// function startTimer() {
//   console.log("Inside startTime()");
//   console.log("What is breakTimeStart:: " + breakTimeStart);
//
//   if (breakTimeStart) {
//     console.log("Inside breakTimeStart Check");
//
//     console.log("");
//     console.log("increaseBreak() - breakTimeStart before:: " + breakTimeStart);
//     breakTimeStart = false;
//     // Made startFlag false so that when the user clicks again it does not go in there
//     // startFlag becomes true due to stopTimer. We call it in increase/decreaseSession
//     startFlag = false;
//     console.log("increaseBreak() - breakTimeStart after:: " + breakTimeStart);
//     console.log("");
//
//     startBreak();
//     return;
//   }
//
//   if (startFlag) {
//     console.log("Inside starFlag Check");
//
//     interval = setInterval(updateCountdown, 1000);
//     messageText.innerHTML = WORK_TIME;
//     startFlag = false;
//     return;
//   }
// }
//
//
// function stopTimer() {
//   console.log("Inside stopTimer()");
//
//   startFlag = true;
//   clearInterval(interval);
// }
//
// function resetTimer() {
//   console.log("Inside resetTimer()");
//
//   clearInterval(interval);
//   time = startingMinutes * 60;
//   interval = 0;
//   changeTimeText();
//   // timeText.innerHTML = `${sessionText.innerHTML} : ${"00"}`;
//   // time = Number(sessionText.innerHTML) * 60;
//   startFlag = true;
//   messageText.innerHTML = "";
//   resetCircleColor();
// }
//
// function startBreak() {
//   console.log("Inside startBreak()");
//
//   intervalBreak = setInterval(updateCountdownBreak, 1000);
//   messageText.innerHTML = BREAK_TIME;
// }
//
// function stopBreak() {
//   console.log("Inside stopBreak()");
//   // console.log("What is before breakTimeStart:: " + breakTimeStart);
//   // // breakTimeStart = true;
//   // console.log("What is after breakTimeStart:: " + breakTimeStart);
//   clearInterval(intervalBreak);
// }
//
// function resetBreak() {
//   console.log("In resetBreak()");
//   breakTimeStart = false;
//   clearInterval(intervalBreak);
//   intervalBreak = 0;
//   timeText.innerHTML = `${breakText.innerHTML} : ${"00"}`;
//   breakTime = Number(breakText.innerHTML) * 60;
//   console.log("What is time:: " + breakTime);
//   messageText.innerHTML = "";
// }
//
// function startLongBreak() {
//   console.log("Inside startLongBreak()");
//
//   intervalLongBreak = setInterval(updateCountdownLongBreak, 1000);
//   messageText.innerHTML = LONG_BREAK_TIME;
//   // changeBreakTextColor();
// }
//
// function stopLongBreak() {
//   console.log("Inside stopLongBreak()");
//
//   clearInterval(intervalLongBreak);
// }
//
// function resetLongBreak() {
//   console.log("In resetLongBreak()");
//
//   clearInterval(intervalLongBreak);
//   intervalLongBreak = 0;
//   timeText.innerHTML = `${longBreakText.innerHTML} : ${"00"}`;
//   longBreakTime = Number(longBreakText.innerHTML) * 60;
//   console.log("What is time:: " + longBreakTime);
//   messageText.innerHTML = "";
//
//   resetCircleColor();
// }
//
// function updateCountdown() {
//   console.log("Inside updateCountdown()");
//
//   sessionTimeFlag = true;
//
//   const minutes = Math.floor(time / 60);
//   let seconds = time % 60;
//
//   console.log("minutes:: " + minutes);
//   console.log("seconds:: " + seconds);
//
//   if (seconds < 10) {
//     seconds = "0" + seconds;
//   }
//
//   if (minutes === 0 && seconds === "00") {
//     console.log("Break time Start");
//     timeText.innerHTML = "";
//     breakTimeStart = true;
//     changeCircleColor();
//     checkmark++;
//     console.log("What is checkmark::" + checkmark);
//     stopTimer();
//     // resetTimer();
//     resetBreak();
//     startBreak();
//     // changeCircleColor();
//     return;
//   }
//
//   checkForFinishedSet();
//
//  timeText.innerHTML = `${minutes} : ${seconds}`;
//   timeContainer.append(timeText);
//
//   time--;
// }
//
//
// function updateCountdownBreak() {
//   console.log("Inside updateCountdownBreak()");
//
//   breakTimeFlag = true;
//   sessionTimeFlag = false;
//
//   const minutes = Math.floor(breakTime / 60);
//   let seconds = breakTime % 60;
//
//   console.log("minutes:: " + minutes);
//   console.log("seconds:: " + seconds);
//
//   if (seconds < 10) {
//     seconds = "0" + seconds;
//   }
//
//   if (minutes === 0 && seconds === "00") {
//     console.log("Break Time Finished. Start another set of work");
//     // breakOverFlag = true;
//
//     breakTimeFlag = false;
//     changeTimeText();
//     startFlag = true;
//     stopBreak();
//     resetBreak();
//     // resetTimer();
//     startTimer();
//     return;
//   }
//
//   timeText.innerHTML = `${minutes} : ${seconds}`;
//   timeContainer.append(timeText);
//
//   breakTime--;
// }
//
// function updateCountdownLongBreak() {
//   console.log("Inside updateCountdownLongBreak()");
//
//   const minutes = Math.floor(longBreakTime / 60);
//   let seconds = longBreakTime % 60;
//
//   console.log("minutes:: " + minutes);
//   console.log("seconds:: " + seconds);
//
//   if (seconds < 10) {
//     seconds = "0" + seconds;
//   }
//
//   if (minutes === 0 && seconds === "00") {
//     console.log("We have finished the long break");
//     stopLongBreak();
//     resetLongBreak();
//     return;
//   }
//
//   timeText.innerHTML = `${minutes} : ${seconds}`;
//   timeContainer.append(timeText);
//
//   longBreakTime--;
// }
//
// function checkForFinishedSet() {
//   console.log("Inside checkForFinishedSet()");
//
//   if (checkmark === 4) {
//     console.log("Checkmark is 4.");
//     resetTimer();
//     resetBreak();
//     startLongBreak();
//     return;
//   }
// }
//
// function changeBreakTextColor() {
//   console.log("Inside changeBreakTextColor");
//
//   messageText.setAttribute("style", "color: red;")
// }
//
// function resetCircleColor() {
//   console.log("Inside resetCircleColor");
//
//   for (let i = 0; i < checkmark; i++) {
//     let circle = document.querySelector(".circle" + "-" + i);
//     circle.setAttribute("style", "background-color: none");
//   }
// }
//
// function changeCircleColor() {
//   console.log("Inside changeCircleColor");
//
//   let circle = document.querySelector(".circle" + "-" + checkmark);
//   circle.setAttribute("style", "background-color: coral");
// }
//
// function increaseLongBreak() {
//   console.log("Inside insertLongBreak()");
//   if (currentLongBreak === 60) {
//     return;
//   }
//
//   currentLongBreak++;
//   longBreakText.innerHTML = currentLongBreak;
// }
//
// function decreaseLongBreak() {
//   console.log("Inside decreaseLongBreak()");
//   if (currentLongBreak === 1) {
//     return;
//   }
//
//   currentLongBreak--;
//   longBreakText.innerHTML = currentLongBreak;
// }
//
// function increaseBreak() {
//   console.log("Inside insertBreak()");
//   if (currentBreak === 60) {
//     return;
//   }
//   stopBreak();
//   // resetBreak();
//   currentBreak++;
//   breakText.innerHTML = currentBreak;
//   console.log("");
//   console.log("increaseBreak() - breakTimeStart before:: " + breakTimeStart);
//   // breakTimeStart = true;
//   console.log("increaseBreak() - breakTimeStart after:: " + breakTimeStart);
//   console.log("");
//   changeTimeText();
//   // timeText.innerHTML = `${currentBreak} : ${"00"}`;
//   // breakTime = currentBreak * 60;
// }
//
// function decreaseBreak() {
//   console.log("Inside decreaseBreak()");
//   if (currentBreak === 1) {
//     return;
//   }
//   stopBreak();
//   // resetBreak();
//   currentBreak--;
//   breakText.innerHTML = currentBreak;
//
//   console.log("");
//   console.log("decreaseBreak() - breakTimeStart before:: " + breakTimeStart);
//   // breakTimeStart = true;
//   console.log("decreaseBreak() - breakTimeStart after:: " + breakTimeStart);
//   console.log("");
//
//   changeTimeText();
//   // timeText.innerHTML = `${currentBreak} : ${"00"}`;
//   // breakTime = currentBreak * 60;
// }
//
// function increaseSession() {
//   console.log("Inside increaseSession()");
//
//   if (currentSession === 60) {
//     return;
//   }
//   stopTimer();
//   // resetTimer();
//   currentSession++;
//   sessionText.innerHTML = currentSession;
//   if (sessionTimeFlag) {
//     changeTimeText();
//   }
//
//   // timeText.innerHTML = `${currentSession} : ${"00"}`;
//   // time = currentSession * 60;
//   // timeText.innerHTML = `${sessionText.innerHTML} : ${"00"}`;
//   // time = Number(sessionText.innerHTML) * 60;
//
// }
//
// function decreaseSession() {
//   console.log("Inside decreaseSession()");
//
//   if (currentSession === 1) {
//     return;
//   }
//
//   stopTimer();
//   // resetTimer();
//   currentSession--;
//   sessionText.innerHTML = currentSession;
//   if (sessionTimeFlag) {
//     changeTimeText();
//   }
// }
//
// function changeTimeText() {
//   // if (!breakOverFlag && !breakTimeFlag) {
//   if (!breakOverFlag && !breakTimeFlag && !breakTimeStart) {
//     console.log("For Changing Session Text");
//
//     console.log("breakOverFlag::" + breakOverFlag);
//     console.log("breakTimeFlag:: " + breakTimeFlag);
//     console.log("!breakOverFlag::" + (!breakOverFlag));
//     console.log("!breakTimeFlag:: " + (!breakTimeFlag));
//
//     timeText.innerHTML = `${currentSession} : ${"00"}`;
//     time = currentSession * 60;
//   }
//
//   if (!breakOverFlag && breakTimeFlag) {
//     console.log("For Changing Break Text");
//     console.log("breakOverFlag::" + breakOverFlag);
//     console.log("breakTimeFlag:: " + breakTimeFlag);
//     console.log("!breakOverFlag::" + (!breakOverFlag));
//     console.log("!breakTimeFlag:: " + (!breakTimeFlag));
//
//     timeText.innerHTML = `${currentBreak} : ${"00"}`;
//     breakTime = currentBreak * 60;
//   }
// }
