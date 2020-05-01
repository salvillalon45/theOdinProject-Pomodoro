// let timeContainer = document.querySelector(".time-container");
// let timeText = document.querySelector(".time-text");
// let sessionText = document.querySelector(".session-text");
// let messageText = document.querySelector(".message-text");
//
// // Variables for Work Time
// // let startingMinutes = 25;
// let startingMinutes = 0.30;
// let time = startingMinutes * 60;
// let interval = 0;
// let currentSession = Number(sessionText.innerHTML);
// const WORK_TIME = "Work Time! Focus";
//
// function startWork() {
//     console.log("Inside startWork()");
//
//     interval = setInterval(updateCountdown, 1000);
//     messageText.innerHTML = WORK_TIME;
// }
//
// function stopWork() {
//     console.log("Inside stopWork()");
//
//     clearInterval(interval);
// }
//
// function increaseSession() {
//     console.log("Inside increaseSession()");
//
//     if (currentSession === 60) {
//         return;
//     }
//     stopTimer();
//     // resetTimer();
//     currentSession++;
//     sessionText.innerHTML = currentSession;
//     if (sessionTimeFlag) {
//         changeTimeText();
//     }
//
//     // timeText.innerHTML = `${currentSession} : ${"00"}`;
//     // time = currentSession * 60;
//     // timeText.innerHTML = `${sessionText.innerHTML} : ${"00"}`;
//     // time = Number(sessionText.innerHTML) * 60;
//
// }
//
// function decreaseSession() {
//     console.log("Inside decreaseSession()");
//
//     if (currentSession === 1) {
//         return;
//     }
//
//     stopTimer();
//     // resetTimer();
//     currentSession--;
//     sessionText.innerHTML = currentSession;
//     if (sessionTimeFlag) {
//         changeTimeText();
//     }
// }
//
// function updateCountdown() {
//     console.log("Inside updateCountdown()");
//
//     sessionTimeFlag = true;
//
//     const minutes = Math.floor(time / 60);
//     let seconds = time % 60;
//
//     console.log("minutes:: " + minutes);
//     console.log("seconds:: " + seconds);
//
//     if (seconds < 10) {
//         seconds = "0" + seconds;
//     }
//
//     if (minutes === 0 && seconds === "00") {
//         console.log("Break time Start");
//         timeText.innerHTML = "";
//         breakTimeStart = true;
//         changeCircleColor();
//         checkmark++;
//         console.log("What is checkmark::" + checkmark);
//         stopTimer();
//         // resetTimer();
//         resetBreak();
//         startBreak();
//         // changeCircleColor();
//         return;
//     }
//
//     checkForFinishedSet();
//
//     timeText.innerHTML = `${minutes} : ${seconds}`;
//     timeContainer.append(timeText);
//
//     time--;
// }
//
//
// export {startWork, stopWork, increaseSession, decreaseSession, updateCountdown}