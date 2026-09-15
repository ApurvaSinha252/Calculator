let currentOperand = "";
let previousOperand = "";
let operation = undefined;

const currentDisplay = document.getElementById("current-operand");
const previousDisplay = document.getElementById("previous-operand");

function appendNumber(number) {

    if (number === "." && currentOperand.includes(".")) {
        return;
    }

    currentOperand += number;
    updateDisplay();
}

function chooseOperation(selectedOperation) {

    if (currentOperand === "") {
        return;
    }

    if (previousOperand !== "") {
        calculate();
    }

    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = "";

    updateDisplay();
}

function calculate() {

    if (previousOperand === "" || currentOperand === "" || !operation) {
        return;
    }

    const previous = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);

    let result;

    switch (operation) {

        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":

            if (current === 0) {
                currentOperand = "Error";
                previousOperand = "";
                operation = undefined;
                updateDisplay();
                return;
            }

            result = previous / current;
            break;
    }

    currentOperand = result.toString();
    previousOperand = "";
    operation = undefined;

    updateDisplay();
}

function clearDisplay() {

    currentOperand = "";
    previousOperand = "";
    operation = undefined;

    updateDisplay();
}

function deleteNumber() {

    currentOperand = currentOperand.slice(0, -1);

    updateDisplay();
}

function updateDisplay() {

    currentDisplay.textContent =
        currentOperand || "0";

    if (operation) {

        let symbol = operation;

        if (operation === "*") symbol = "×";
        if (operation === "/") symbol = "÷";

        previousDisplay.textContent =
            `${previousOperand} ${symbol}`;

    } else {

        previousDisplay.textContent =
            previousOperand;
    }
}