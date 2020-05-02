console.log("Inside index.js");

let timeContainer = document.querySelector(".time-container");
let timeText = document.querySelector(".time-text");
let sessionText = document.querySelector(".session-text");
let messageText = document.querySelector(".message-text");
let breakText = document.querySelector(".break-text");
let longBreakText = document.querySelector(".long-break-text");
let titleText = document.querySelector(".title-text");

const WORK_TIME = "Work Time! Focus";
const BREAK_TIME = "Break Time!";
const LONG_BREAK_TIME = "Long Break Time!";
const FINISHED = "You have finished four sets of work! Congrats!";
// timeText.innerHTML = "25 : 00";
// sessionText.innerHTML = "25";
// breakText.innerHTML = "5"
// longBreakText.innerHTML = "10"

timeText.innerHTML = "1 : 00";
sessionText.innerHTML = "1";
breakText.innerHTML = "1";
longBreakText.innerHTML = "1";

// Variables for Work Time
// let startingMinutes = 25;
let startingMinutes = 0.20;
let time = startingMinutes * 60;
let interval = 0;
let currentSession = Number(sessionText.innerHTML);

// Variables for Break Time
// let startingBreakMinutes = 5;
let startingBreakMinutes = 0.20;
let breakTime = startingBreakMinutes * 60;
let intervalBreak = 0;
let currentBreak = Number(breakText.innerHTML);

// Variables for Long Break Time
// let startingLongBreakMinutes = 10;
let startingLongBreakMinutes = 1;
let longBreakTime = startingLongBreakMinutes * 60;
let intervalLongBreak = 0;
let currentLongBreak = Number(longBreakText.innerHTML);

// Activated when it is work session
let workTimeFlag = false;

// Activated when it is break session
let breakTimeFlag = false;

// Activated when it is paused session
let isPausedFlag = false;

// Activated when it is long break session
let longBreakTimeFlag = false;

// To keep track of sets
let checkmark = 0;

let startBreakChime = new Audio("assets/sounds/timer_end.mp3");
let endBreakChime = new Audio("assets/sounds/break.wav");
let endCycleChime = new Audio('assets/sounds/long-break.wav');

function startButton() {
    console.log("Inside startButton()");

    console.log("breakTimeFlag:: " + breakTimeFlag);
    console.log("workTimeFlag:: " + workTimeFlag);
    console.log("longBreakTimeFlag:: " + longBreakTimeFlag);

    if (breakTimeFlag) {
        console.log("Going to start break session");
        breakTimeFlag = true;
        startBreak();
        return;
    }

    if (!isPausedFlag  && !workTimeFlag) {
        console.log("Going to start work session");
        workTimeFlag = true;
        startWork();
        return;
    }

    // Will only reach when it is false
    if (!longBreakTimeFlag) {
        console.log("Going to start long break session");
        // longBreakTimeFlag = false;
        longBreakTimeFlag = true;
        messageText.innerHTML = "";
        startLongBreak();
        return;
    }
}

function stopButton() {
    console.log("Inside stopButton()");

    console.log("breakTimeFlag:: " + breakTimeFlag);
    console.log("workTimeFlag:: " + workTimeFlag);
    console.log("longBreakTimeFlag:: " + longBreakTimeFlag);

    if (longBreakTimeFlag) {
        console.log("Going to stop long break");
        // longBreakTimeFlag = true;
        longBreakTimeFlag = false;
        stopLongBreak();
        return;
    }

    if (breakTimeFlag) {
        console.log("Going to stop break");
        breakTimeFlag = true;
        stopBreak();
        return;
    }

    if (workTimeFlag) {
        console.log("Going to stop work");
        workTimeFlag = false;
        stopWork();
        return;
    }
}

function resetButton() {
    console.log("Inside resetButton()");

    console.log("breakTimeFlag:: " + breakTimeFlag);
    console.log("workTimeFlag:: " + workTimeFlag);
    console.log("longBreakTimeFlag:: " + longBreakTimeFlag);

    if (!longBreakTimeFlag) {
        console.log("Going to reset long break session");
        resetLongBreak();
        resetCircleColor();
        return;
    }

    if (workTimeFlag) {
        console.log("Going to reset work session");
        resetWork();
        resetCircleColor();
        return;
    }

    if (breakTimeFlag) {
        console.log("Going to reset break session");
        resetBreak();
        resetCircleColor();
        return;
    }
}

// ------------------------------------------------------------------------------
// Work Session
// ------------------------------------------------------------------------------
function startWork() {
    console.log("Inside startWork()");

    interval = setInterval(updateCountdown, 1000);
    messageText.innerHTML = WORK_TIME;
}

function stopWork() {
    console.log("Inside stopWork()");

    clearInterval(interval);
}

function resetWork() {
    console.log("Inside resetWork()");

    clearInterval(interval);
    time = startingMinutes * 60;
    interval = 0;
    workTimeFlag = false;
    changeTimeText();
    // timeText.innerHTML = `${sessionText.innerHTML} : ${"00"}`;
    // time = Number(sessionText.innerHTML) * 60;
    messageText.innerHTML = "";
}

function increaseSession() {
    console.log("Inside increaseSession()");
    console.log("what is workTimeFlag:: " + workTimeFlag);
    console.log("what is breakTimeFlag:: " + breakTimeFlag);

    if (currentSession === 60) {
        return;
    }
    currentSession++;
    sessionText.innerHTML = currentSession;

    // Only update the time for the work session when break time has not started
    // and when work time has not started
    // this means that workTimeFlag and breakTimeFlag have to be false
    if (!workTimeFlag && breakTimeFlag === false) {
        changeTimeText();
    }
}

function decreaseSession() {
    console.log("Inside decreaseSession()");
    console.log("what is workTimeFlag:: " + workTimeFlag);
    console.log("what is breakTimeFlag:: " + breakTimeFlag);

    if (currentSession === 1) {
        return;
    }

    currentSession--;
    sessionText.innerHTML = currentSession;

    // Only update the time for the work session when break time has not started
    // and when work time has not started
    // this means that workTimeFlag and breakTimeFlag have to be false
    if (!workTimeFlag && breakTimeFlag === false) {
        changeTimeText();
    }
}

function updateCountdown() {
    console.log("Inside updateCountdown()");
    console.log("What is time:: " + time);

    changeTitleText();

    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    console.log("minutes:: " + minutes);
    console.log("seconds:: " + seconds);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    checkForFinishedSet();

    if (minutes === 0 && seconds === "00") {
        console.log("Break time Start");

        startBreakChime.play();

        console.log("breakTimeFlag:: " + breakTimeFlag);
        breakTimeFlag = true;
        workTimeFlag = false;
        console.log("breakTimeFlag:: " + breakTimeFlag);

        changeCircleColor();
        checkmark++;
        console.log("What is checkmark::" + checkmark);

        stopWork();
        // resetBreak();
        startBreak();

        return;
    }

    timeText.innerHTML = `${minutes} : ${seconds}`;
    timeContainer.append(timeText);

    time--;
}


// ------------------------------------------------------------------------------
// Break Session
// ------------------------------------------------------------------------------
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
    breakTime = startingBreakMinutes * 60;
    intervalBreak = 0;
    breakTimeFlag = false;
    changeTimeText();
    // timeText.innerHTML = `${sessionText.innerHTML} : ${"00"}`;
    // time = Number(sessionText.innerHTML) * 60;
    messageText.innerHTML = "";

}

function increaseBreak() {
    console.log("Inside increaseBreak()");
    console.log("what is workTimeFlag:: " + workTimeFlag);
    console.log("what is breakTimeFlag:: " + breakTimeFlag);

    if (currentBreak === 60) {
        return;
    }

    currentBreak++;
    breakText.innerHTML = currentBreak;

    // Only update the time for the break when break time has not started
    // only when breakTimeFlag is false
    if (breakTimeFlag === false) {
        breakTime = currentBreak * 60;
    }
}

function decreaseBreak() {
    console.log("Inside decreaseBreak()");

    if (currentBreak === 1) {
        return;
    }

    currentBreak--;
    breakText.innerHTML = currentBreak;

    // Only update the time for the break when break time has not started
    // only when breakTimeFlag is false
    if (breakTimeFlag === false) {
        breakTime = currentBreak * 60;
    }
}

function updateCountdownBreak() {
    console.log("Inside updateCountdownBreak()");
    console.log("breakTime will be:: " + breakTime);

    changeTitleText();

    const minutes = Math.floor(breakTime / 60);
    let seconds = breakTime % 60;

    console.log("minutes:: " + minutes);
    console.log("seconds:: " + seconds);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0 && seconds === "00") {
        console.log("Break Time Finished. Start another set of work");

        breakTimeFlag = false;
        workTimeFlag = true;

        changeTimeText();
        stopBreak();
        resetBreak();
        startWork();

        if (checkmark < 4) {
            endBreakChime.play();
        }

        return;
    }

    timeText.innerHTML = `${minutes} : ${seconds}`;
    timeContainer.append(timeText);

    breakTime--;
}

// ------------------------------------------------------------------------------
// Long Break Session
// ------------------------------------------------------------------------------
function startLongBreak() {
    console.log("Inside startLongBreak()");

    intervalLongBreak = setInterval(updateCountdownLongBreak, 1000);
    messageText.innerHTML = LONG_BREAK_TIME;
}

function stopLongBreak() {
    console.log("Inside stopLongBreak()");

    clearInterval(intervalLongBreak);
}

function resetLongBreak() {
    console.log("In resetLongBreak()");

    clearInterval(intervalLongBreak);
    longBreakTime = startingLongBreakMinutes * 60;
    intervalLongBreak = 0;
    longBreakTimeFlag = true;
    changeTimeText();
    messageText.innerHTML = "";
}

function increaseLongBreak() {
    console.log("Inside insertLongBreak()");

    if (currentLongBreak === 60) {
        return;
    }

    currentLongBreak++;
    longBreakText.innerHTML = currentLongBreak;

    // Only update the time for the long break when long break time has not started
    // only when longBreakTimeFlag is false
    if (longBreakTimeFlag === false) {
        longBreakTime = currentLongBreak * 60;
    }
}

function decreaseLongBreak() {
    console.log("Inside decreaseLongBreak()");

    if (currentLongBreak === 1) {
        return;
    }

    currentLongBreak--;
    longBreakText.innerHTML = currentLongBreak;

    // Only update the time for the long break when long break time has not started
    // only when longBreakTimeFlag is false
    if (longBreakTimeFlag === false) {
        longBreakTime = currentLongBreak * 60;
    }
}

function updateCountdownLongBreak() {
    console.log("Inside updateCountdownLongBreak()");

    changeTitleText();

    const minutes = Math.floor(longBreakTime / 60);
    let seconds = longBreakTime % 60;

    console.log("minutes:: " + minutes);
    console.log("seconds:: " + seconds);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    console.log("What is longBreakTimeFlag:: " + longBreakTimeFlag);

    if (minutes === 0 && seconds === "00") {
        console.log("We have finished the long break");
        stopLongBreak();
        resetLongBreak();
        changeFinalMessageText();
        longBreakTimeFlag = false;
        workTimeFlag = false;
        return;
    }

    timeText.innerHTML = `${minutes} : ${seconds}`;
    timeContainer.append(timeText);

    longBreakTime--;
}

// ------------------------------------------------------------------------------
// Functions to facilitate resets and changing content
// ------------------------------------------------------------------------------
function checkForFinishedSet() {
    console.log("Inside checkForFinishedSet()");

    if (checkmark === 4) {
        console.log("Checkmark is 4");
        resetWork();
        resetBreak();

        console.log("what is workTimeFlag:: " + workTimeFlag);
        console.log("what is breakTimeFlag:: " + breakTimeFlag);
        console.log("what is longBreakTimeFlag:: " + longBreakTimeFlag);
        longBreakTimeFlag = true;
        workTimeFlag = true;
        messageText.innerHTML = "";
        endCycleChime.play();
        startLongBreak();
        return;
    }
}

function resetCircleColor() {
    console.log("Inside resetCircleColor");

    for (let i = 0; i < checkmark; i++) {
        let circle = document.querySelector(".circle" + "-" + i);
        circle.setAttribute("style", "background-color: none");
    }
}

function changeCircleColor() {
    console.log("Inside changeCircleColor");

    let circle = document.querySelector(".circle" + "-" + checkmark);
    circle.setAttribute("style", "background-color: coral");
}

function changeTimeText() {
    console.log("Inside changeTimeText()");

    timeText.innerHTML = `${currentSession} : ${"00"}`;
    time = currentSession * 60;
}

function changeTitleText() {
    console.log("Inside changeTitleText()");
    console.log("What is longBreakTimeFlag:: " + longBreakTimeFlag);

    if (longBreakTimeFlag) {
        console.log("Changing title during long break");
        titleText.innerHTML = timeText.innerHTML + " " + LONG_BREAK_TIME;
        return;
    }

    if (workTimeFlag === true && breakTimeFlag === false) {
        console.log("Changing title during work time");
        titleText.innerHTML = timeText.innerHTML + " " + WORK_TIME;
        return;
    }

    if (workTimeFlag === false && breakTimeFlag === true) {
        console.log("Changing title during break time");
        titleText.innerHTML = timeText.innerHTML + " " + BREAK_TIME;
        return;
    }
}

function changeFinalMessageText() {
    messageText.innerHTML = FINISHED;
}

