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

const operators = {
    'x': multiply,
    '+': add,
    '/': divide,
    '-': subtract
}

const currentOperation = {
    firstNumber: null,
    operator: null,
    reset: function() {
        console.log("Resetting");
        this.firstNumber = null;
        this.operator = null;
    }
}

const display = document.querySelector('.display');
reset();



function onNumberClick(e) {
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
        const secondNumber = Number(display.innerText.split(currentOperation.operator)[1]);
        let result = operate(
            currentOperation.operator, currentOperation.firstNumber, secondNumber
            );
        setDisplay(result+operator);
        currentOperation.firstNumber = result;
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
        return;
    }
    const secondNumber = Number(display.innerText.split(currentOperation.operator)[1]);
    console.log(secondNumber);

    const result = operate(
        currentOperation.operator, currentOperation.firstNumber, secondNumber
        );
    
    currentOperation.firstNumber = result;
    currentOperation.operator = null;
    setDisplay(result);
}

function operate(operator, a, b) {
    console.log(`operate called with: ${operator}, ${a}, ${b}`);
    if(operators.hasOwnProperty(operator)) {
        return operators[operator](a, b);
    } else {
        return console.log("Operator not found in operators object");
    }
}