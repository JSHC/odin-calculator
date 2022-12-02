const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
    button.addEventListener('click', onNumberClick);
});
const display = document.querySelector('.display');
clearDisplay();

function onNumberClick(e) {
    const number = Number(e.target.innerText);
    console.log(number);
    updateDisplay(number);
}

function updateDisplay(newString) {
    const currentDisplayString = display.innerText;
    display.innerText = currentDisplayString + newString;
}

function clearDisplay() {
    display.innerText = '';
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
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return multiply(a, b);
        default:
            return "Error: Invalid operator";
    }
}