const numberButtons = document.querySelectorAll(".number");

numberButtons.forEach(button => {
    button.addEventListener('click', onNumberClick);
});

const operatorButtons = document.querySelectorAll('.operator');

operatorButtons.forEach(button => {
    button.addEventListener('click', onOperatorClick);
});

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', reset);

const sumButton = document.querySelector('#sum');
sumButton.addEventListener('click', sum);

const display = document.querySelector('.display');

const operators = {
    'x': multiply,
    '+': add,
    '/': divide,
    '-': subtract
}

const currentOperation = {
    firstNumber: null,
    operator: null,
    error: "",
    reset: function() {
        console.log("Resetting");
        this.firstNumber = null;
        this.operator = null;
        this.error = "";
    }
}

reset();

function onNumberClick(e) {
    if(currentOperation.error) {
        reset();
    }
    const number = Number(e.target.innerText);
    console.log(number);
    updateDisplay(number);
}

function onOperatorClick(e) {
    const operator = e.target.innerText;
    console.log(operator);
    if (currentOperation.firstNumber === null) {
        currentOperation.firstNumber = getNumberFromDisplay();
        updateDisplay(operator);
    } else if (currentOperation.operator === null) {
        currentOperation.operator = operator;
        updateDisplay(operator);
    } else {
        splitString = display.innerText.split(currentOperation.operator);
        console.log(splitString);
        let secondNumber;
        if (splitString[1]) {
            secondNumber = Number(splitString[1]);
        } else {
            return;
        }
        let result = operate(
            currentOperation.operator, currentOperation.firstNumber, secondNumber
            );
            
        if (result === Infinity) {
            currentOperation.error = "Cannot divide by zero"
            setDisplay(currentOperation.error);
            disableOperators();
            return;
        }
        currentOperation.firstNumber = roundToDigits(result, 10);
        setDisplay(currentOperation.firstNumber+operator);
    }
    currentOperation.operator = operator;
    console.log(currentOperation)
}

function updateDisplay(newString) {
    const currentDisplayString = display.innerText;
    if (currentDisplayString === '0' && !isNaN(Number(newString))) {
        setDisplay(newString);
    } else {
        setDisplay(currentDisplayString + newString);
    }
}

function reset() {
    currentOperation.reset();
    clearDisplay();
    enableOperators();
}

function clearDisplay() {
    setDisplay('0');
}

function setDisplay(string) {
    display.innerText = string;
}

function getDisplay() {
    return display.innerText;
}

function getNumberFromDisplay() {
    return Number(display.innerText);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function sum() {
    if(!currentOperation.operator) {
        currentOperation.firstNumber = getNumberFromDisplay();
        return;
    }
    splitString = display.innerText.split(currentOperation.operator);
    console.log(splitString);
    let secondNumber;
    if (splitString[1]) {
        secondNumber = Number(splitString[1]);
    } else {
        secondNumber = currentOperation.firstNumber;
    }

    console.log(secondNumber);

    const result = operate(
        currentOperation.operator, currentOperation.firstNumber, secondNumber
        );
    if (result === Infinity) {
        currentOperation.error = "Cannot divide by zero"
        setDisplay(currentOperation.error);
        disableOperators();
        return;
    }
    
    currentOperation.firstNumber = roundToDigits(result, 10);
    currentOperation.operator = null;
    setDisplay(currentOperation.firstNumber);
}

function roundToDigits(number, digits) {
    return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
}

function operate(operator, a, b) {
    console.log(`operate called with: ${operator}, ${a}, ${b}`);
    if(operators.hasOwnProperty(operator)) {
        return operators[operator](a, b);
    } else {
        return console.log("Operator not found in operators object");
    }
}

function disableOperators() {
    operatorButtons.forEach(btn => {
        btn.setAttribute("disabled", "");
    });
    sumButton.setAttribute("disabled", "");
}

function enableOperators() {
    operatorButtons.forEach(btn => {
        btn.removeAttribute("disabled", "");
    });
    sumButton.removeAttribute("disabled", "");
}