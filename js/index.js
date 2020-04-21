console.log("Inside index.js");

let displayCurrent = document.querySelector(".display-current");
let displayResults = document.querySelector(".display-results");
let displayNumber = document.createElement("p");

let currentNum = "";
let displayResultNum = "";
let previousNum = ""
let operator= "";
let debug = 1;
let equalFlag = 0;
let moreThanOneOperatorFlag = 0

function displayHistory() {
  // This function is used to display the previous calculations the user has made. It will be activated everytime the
  // user presses = button. It means that the user has finished the calculation and is ready to be displayed in history
  debug === 1 && console.log("Inside displayHistory()");

  let expression = previousNum.toString() + operator.toString() + displayResultNum.toString() + " = " + currentNum.toString();
  let displayCalculationResult = document.createElement("p");
  displayCalculationResult.innerHTML = expression;
  displayResults.append(displayCalculationResult);
  equalFlag = 0;
}

function displayCurrentCalculations() {
  // This function displays the current calculations the user is making
  debug === 1 && console.log("Inside displayCurrentCalculations()");

  displayNumber.textContent = currentNum;
  displayCurrent.appendChild(displayNumber);

  if (equalFlag === 1) {
    displayHistory();
  }
}

function appendNumber(num) {
  // This functions append the new number the user enter to the current number we are working on.
  // If the user tries to put another decimal point it will not let it.
  debug === 1 && console.log("Inside appendNumber()");

  if (num.toString() === "." && currentNum.toString().includes(".")) {
      alert("It already has a decimal!");
  }
  else {
    currentNum = currentNum.toString() + num.toString();
  }
}

function selectNum(num) {
  // This function retrieves the number the user picked from the buttons. It then calls appendNumber to append to what we currently have
  // Then it calls displayCurrentCalculations to display it
  debug === 1 && console.log("Inside selectNum()");

  appendNumber(num);
  displayCurrentCalculations();
}

function selectEqual(equal) {
  // This function is used everytime the user calls the equal button
  debug === 1 && console.log("Inside selectEqual()");

  // The case when the user input = sign before getting all numbers ready
  if (previousNum.length === 0 || currentNum.length === 0) {
    return;
  }

  equalFlag = 1;

  performCalculationForEqual();
}

function performCalculationForEqual() {
  // This function will be called when the user just performs calculation on two numbers such as 2 + 2
  debug === 1 && console.log("Inside performCalculationForEqual()");

  // This is needed for the display previous results. We want to keep the currentNum before it gets overwritten
  displayResultNum = currentNum;

  // Overwrite currentNum to the result
  let result = operate();
  console.log("What is result");
  currentNum = result;
  displayCurrentCalculations();

  // Overwrite for next calculation
  currentNum = "";
  previousNum = "";
  operator = "";

  printNums();
  moreThanOneOperatorFlag = 0;
}

function performCalculationForMoreThanOneOperator() {
  // This function will be called when the user just performs calculation on more than two numbers like 2 + 2 - 4
  debug === 1 && console.log("Inside performCalculationForMoreThanOneOperator()");

  // This is needed for the display previous results. We want to keep the currentNum before it gets overwritten
  displayResultNum = currentNum;

  // Overwrite currentNum to the result
  let result = operate();
  currentNum = result;

  // Display the information
  displayCurrentCalculations();
  displayHistory();

  // For the next calcuation
  previousNum = result;
}

function printNums() {
  // Use this functions to help print out this global variables. This really helped me out debug a lot of things

  console.log("operator:: " + operator);
  console.log("previousNum:: " + previousNum);
  console.log("currentNum:: " + currentNum);
}

function selectOperator(newOperator) {
  // For when user enters an operator
  debug === 1 && console.log("Inside selectOperator()");

  // This is to support more than one operator
  if (moreThanOneOperatorFlag >= 1) {
    performCalculationForMoreThanOneOperator();
  }

  operator = newOperator;
  // Store the previous number the user entered
  previousNum = currentNum;

  // We want to clear the currentNum for the next number the user will pick
  currentNum = "";

  // Increase the flag. If the flag is more than one that means that they are chaining expressions
  moreThanOneOperatorFlag++;
}

function clearDisplayResults() {
  // Clear the display results. Called when the user clicks on AC
  debug === 1 && console.log("Inside clearDisplayResults()");

  while (displayResults.firstChild) {
    displayResults.removeChild(displayResults.firstChild);
  }
}

function selectUtil(util) {
  // Depending on the utility they select. It will do a different action
  debug === 1 && console.log("Inside selectUitl()");

  if (util === "AC") {
    // Clear everything. This means reset the global variables
    debug === 1 && console.log("clearing calculator");
    currentNum = "";
    previousNum = "";
    operator = "";
    displayCurrentCalculations();
    clearDisplayResults();
  }
  else if (util === "DEL") {
    // Remove the recent number they inputed
    debug === 1 && console.log("removing most recent number");

    currentNum = "";
    displayCurrentCalculations();
  }
  else if (util === "%") {
    // Turn the number into a decimal
    debug === 1 && console.log("turning number into decimal");

    currentNum = currentNum / 100;
    displayCurrentCalculations();
  }
}

function add(num1, num2) {
  currentNum = parseFloat(num1) + parseFloat(num2);
  return currentNum;
}

function subtract(num1, num2) {
  currentNum = parseFloat(num1) - parseFloat(num2);
  return currentNum;
}

function multiply(num1, num2) {
  currentNum = parseFloat(num1) * parseFloat(num2);
  return currentNum;
}

function divide(num1, num2) {
  if (parseInt(num2) === 0) {
    currentNum = "Cannot Divide By Zero";
    return currentNum;
  }

  currentNum = parseFloat(num1) / parseFloat(num2);
  return currentNum;
}

function operate() {
  debug === 1 && console.log("Inside operate()");
  let result = "";

  if (operator === "+") {
    debug === 1 && console.log("Going to add");
    result = add(previousNum, currentNum);
  }
   else if (operator === "-") {
    debug === 1 && console.log("Going to subtract");
    result = subtract(previousNum, currentNum);
  }
  else if (operator === "x") {
    debug === 1 && console.log("Going to multiply");
    result = multiply(previousNum, currentNum);
  }
  else if (operator === "/") {
    debug === 1 && console.log("Going to divide");
    result = divide(previousNum, currentNum);
  }

  debug === 1 && console.log("Calculation result is:: " + result);
  return Math.round((result + Number.EPSILON) * 100) / 100
}

// KeyBoard Support
// ------------------------------------------------------
this.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === '=') {
      selectEqual();
  }
  if (e.key === 'Backspace' || e.key === 'Delete') {
    selectUtil("DEL");
  }
  if (e.key >= 0 && e.key <= 9) {
    appendNumber(e.key);
    displayCurrentCalculations();
  }
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
    selectOperator(e.key);
  }
});
