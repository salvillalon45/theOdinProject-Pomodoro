console.log("Inside index.js");

let timeContainer = document.querySelector(".time-container");
let timeText = document.querySelector(".time-text");
let sessionText = document.querySelector(".session-text");
let messageText = document.querySelector(".message-text");
let breakText = document.querySelector(".break-text");
let longBreakText = document.querySelector(".long-break-text");
let titleText = document.querySelector(".title-text");
let debug = 0;

const WORK_TIME = "Work Time! Focus";
const BREAK_TIME = "Break Time!";
const LONG_BREAK_TIME = "Long Break Time!";
const FINISHED = "You have finished four sets of work! Congrats!";

timeText.innerHTML = "25 : 00";
sessionText.innerHTML = "25";
breakText.innerHTML = "5";
longBreakText.innerHTML = "10";

debug === 1 && (timeText.innerHTML = "1 : 00");
debug === 1 && (sessionText.innerHTML = "1");
debug === 1 && (breakText.innerHTML = "1");
debug === 1 && (longBreakText.innerHTML = "1");

// Variables for Work Time
let startingMinutes = 25;
let time = startingMinutes * 60;
let interval = 0;
let currentSession = Number(sessionText.innerHTML);

// Variables for Break Time
let startingBreakMinutes = 5;
let breakTime = startingBreakMinutes * 60;
let intervalBreak = 0;
let currentBreak = Number(breakText.innerHTML);

// Variables for Long Break Time
let startingLongBreakMinutes = 10;
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
let checkMark = 0;

// Audio for break, work, and long break sessions
let startBreakChime = new Audio("assets/sounds/timer_end.mp3");
let endBreakChime = new Audio("assets/sounds/break.wav");
let endCycleChime = new Audio('assets/sounds/long-break.wav');

debug === 1 && (startingMinutes = 0.20);
debug === 1 && (startingBreakMinutes = 0.20);
debug === 1 && (startingLongBreakMinutes = 1);

function startButton() {
    console.log("Inside startButton()");

    debug === 1 && printFlags();

    if (breakTimeFlag) {
        console.log("Going to start break session");
        breakTimeFlag = true;
        startBreak();
        return;
    }

    if (!isPausedFlag  && !workTimeFlag) {
        console.log("Going to start work session");
        workTimeFlag = true;
        longBreakTimeFlag = true;
        startWork();
        return;
    }

    // Will only reach when it is false
    if (!longBreakTimeFlag) {
        console.log("Going to start long break session");
        longBreakTimeFlag = true;
        messageText.innerHTML = "";
        startLongBreak();
        return;
    }
}

function stopButton() {
    console.log("Inside stopButton()");

    debug === 1 && printFlags();

    if (longBreakTimeFlag) {
        console.log("Going to stop long break");
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

    debug === 1 && printFlags();

    if (!longBreakTimeFlag) {
        console.log("Going to reset long break session");
        resetLongBreak();
        resetBreak();
        resetWork();
        resetCircleColor();
        clearTitleText();
        checkMark = 0;
        return;
    }

    if (workTimeFlag) {
        console.log("Going to reset work session");
        resetWork();
        resetCircleColor();
        clearTitleText();
        checkMark = 0;
        return;
    }

    if (breakTimeFlag) {
        console.log("Going to reset break session");
        resetBreak();
        resetCircleColor();
        clearTitleText();
        checkMark = 0;
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
    changeTimeTextForWorkSession();
    messageText.innerHTML = "";
}

function increaseSession() {
    console.log("Inside increaseSession()");

    if (currentSession === 60) {
        return;
    }

    currentSession++;
    sessionText.innerHTML = currentSession;

    // Only update the time for the work session when break time has not started
    // and when work time has not started
    // this means that workTimeFlag and breakTimeFlag have to be false
    if (!workTimeFlag && breakTimeFlag === false) {
        changeTimeTextForWorkSession();
    }
}

function decreaseSession() {
    console.log("Inside decreaseSession()");

    if (currentSession === 1) {
        return;
    }

    currentSession--;
    sessionText.innerHTML = currentSession;

    // Only update the time for the work session when break time has not started
    // and when work time has not started
    // this means that workTimeFlag and breakTimeFlag have to be false
    if (!workTimeFlag && breakTimeFlag === false) {
        changeTimeTextForWorkSession();
    }
}

function updateCountdown() {
    console.log("Inside updateCountdown()");

    let timeArray = calculateMinutesAndSeconds(time);
    const minutes = timeArray[0];
    let seconds = timeArray[1];

    debug === 1 && printTimes(minutes, seconds);

    seconds = updateSecondsForLessThan10(seconds);

    if (minutes === 0 && seconds === "00") {
        // Work is over so start break session
        startBreakSession();
    }

    changeTimeText(minutes, seconds);

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
    changeTimeTextForWorkSession();
    messageText.innerHTML = "";
}

function increaseBreak() {
    console.log("Inside increaseBreak()");

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

    let timeArray = calculateMinutesAndSeconds(breakTime);
    const minutes = timeArray[0];
    let seconds = timeArray[1];

    debug === 1 && printTimes(minutes, seconds);

    seconds = updateSecondsForLessThan10(seconds);

    if (minutes === 0 && seconds === "00") {
        // Break is over so start work session
        startWorkSession();
    }

    changeTimeText(minutes, seconds);

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
    longBreakTimeFlag = false;
    changeTimeTextForWorkSession();
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

    let timeArray = calculateMinutesAndSeconds(longBreakTime);
    const minutes = timeArray[0];
    let seconds = timeArray[1];

    debug === 1 && printTimes(minutes, seconds);

    seconds = updateSecondsForLessThan10(seconds);

    if (minutes === 0 && seconds === "00") {
        // Long break is over so reset everything to the beginning
        finishedLongBreakSession();
    }

    changeTimeText(minutes, seconds);

    longBreakTime--;
}

// ------------------------------------------------------------------------------
// Functions to facilitate resets and changing content
// ------------------------------------------------------------------------------
function updateSecondsForLessThan10(seconds) {
    // This function appends an extra zero to numbers that are single digit

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return seconds;
}

function calculateMinutesAndSeconds(time) {

    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    return [minutes, seconds];
}

function startBreakSession() {
    console.log("Work time finished. Break time Start");

    startBreakChime.play();

    // Flags needed for break session to start
    breakTimeFlag = true;
    workTimeFlag = false;

    changeCircleColor();
    checkMark++;

    stopWork();
    startBreak();

    return;

}
function startWorkSession() {
    console.log("Break time finished. Start another set of work");

    breakTimeFlag = false;
    workTimeFlag = true;

    changeTimeTextForWorkSession();

    stopBreak();
    resetBreak();

    // If checkMark is less than 4 that means that we can do another session of work
    if (checkMark < 4) {
        endBreakChime.play();
        startWork();
    }

    // If checkMark is 4 then we are finished
    checkForFinishedSet();

    return;
}

function finishedLongBreakSession() {
    console.log("Inside finishedLongBreakSession()");

    console.log("We have finished the long break");
    stopLongBreak();
    resetLongBreak();
    changeFinalMessageText();
    longBreakTimeFlag = false;
    workTimeFlag = false;
    clearTitleText();

    return;
}

function checkForFinishedSet() {
    console.log("Inside checkForFinishedSet()");

    if (checkMark === 4) {
        console.log("Checkmark is 4. Now we going to prepare to start Long Break");

        resetWork();
        resetBreak();

        debug === 1 && printFlags();

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

    for (let i = 0; i < checkMark; i++) {
        let circle = document.querySelector(".circle" + "-" + i);
        circle.setAttribute("style", "background-color: none");
    }
}

function changeCircleColor() {
    console.log("Inside changeCircleColor");

    let circle = document.querySelector(".circle" + "-" + checkMark);
    circle.setAttribute("style", "background-color: coral");
}

function changeTimeTextForWorkSession() {
    console.log("Inside changeTimeText()");

    timeText.innerHTML = `${currentSession} : ${"00"}`;
    time = currentSession * 60;
}

function clearTitleText() {
    console.log("Inside clearTitleText()");

    titleText.innerHTML = "The Odin Project: Pomodoro";
    return;
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

function changeTimeText(minutes, seconds) {
    console.log("Inside changeTimeText()");

    timeText.innerHTML = `${minutes} : ${seconds}`;
    timeContainer.append(timeText);

    changeTitleText();
}

function changeFinalMessageText() {
    console.log("Inside changeFinalMessageText()");

    messageText.innerHTML = FINISHED;
}

function printFlags() {

    console.log("breakTimeFlag:: " + breakTimeFlag);
    console.log("workTimeFlag:: " + workTimeFlag);
    console.log("longBreakTimeFlag:: " + longBreakTimeFlag);
}

function printTimes(minutes, seconds) {

    console.log("minutes:: " + minutes);
    console.log("seconds:: " + seconds);
}