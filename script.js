const numberButtons = document.querySelectorAll(".number");

numberButtons.forEach(button => {
    button.addEventListener('click', onNumberClick);
});

const operatorButtons = document.querySelectorAll('.operator');

operatorButtons.forEach(button => {
    button.addEventListener('click', onOperatorClick);
});

const clearButton = document.querySelector('.clear').addEventListener('click',
    clearDisplay);

const display = document.querySelector('.display');
clearDisplay();

let firstNumber;

function onNumberClick(e) {
    const number = Number(e.target.innerText);
    console.log(number);
    updateDisplay(number);
}

function onOperatorClick(e) {
    const operator = e.target.innerText;
    console.log(operator);
    if (!firstNumber) {
        firstNumber = getNumberFromDisplay();
        updateDisplay(operator);
    } else {
        const secondNumber = Number(display.innerText.split(operator)[1]);
        let result = operate(
            operator, firstNumber, secondNumber
            );
        setDisplay(result+operator);
        firstNumber = result;
    }
}

function updateDisplay(newString) {
    const currentDisplayString = display.innerText;
    if (currentDisplayString === '0') {
        setDisplay(newString);
    } else {
        setDisplay(currentDisplayString + newString);
    }
}

function clearDisplay() {
    setDisplay('0');
}

function setDisplay(string) {
    display.innerText = string;
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

function operate(operator, a, b) {
    console.log(`operate called with: ${operator}, ${a}, ${b}`);
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return multiply(a, b);
        default:
            return "Error: Invalid operator";
    }
}