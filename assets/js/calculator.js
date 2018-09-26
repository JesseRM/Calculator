let numbers = document.querySelectorAll(".number");
let operators = document.querySelectorAll(".operator");
let decimal = document.querySelector(".decimal");
let equals = document.querySelector(".equals");
let clearAC = document.querySelector(".ac");
let clearCE = document.querySelector(".ce");
let screen = document.querySelector(".screen");
let inputArr = [];
let currentVal = '';
let total = 0;
let equalStatus = false;
const checkDot = /\./;
const checkNum = /\d/;
const checkOps = /[+*\/-]/;


//Add event listeners for numbers
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function () {
        checkNumber(this.textContent);
        
        if (isOverflown(screen)) {
            updateFontSize(screen, 'reduce');
        }
    });
}

//Add event listeners for operators
for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function () {
        checkOperator(this.textContent);
    });
}

//Add event listener for decimal point
decimal.addEventListener("click", function () {
    checkDecimal();
});

clearCE.addEventListener("click", function () {
    if (inputArr.length === 3) {
        inputArr[2] = "0";
        updateScreen();
    } else if (inputArr.length === 1) {
        inputArr[0] = "0";
        updateScreen();
    }
    console.log(inputArr);
});

clearAC.addEventListener("click", function () {
    inputArr.length = 0;
    inputArr.push("0");
    updateScreen();
});

equals.addEventListener("click", function () {
    if (inputArr.length === 3) {
        doArithmetic(inputArr[0], inputArr[2], inputArr[1]);
        equalStatus = true;
    }
});

function checkDecimal () {
    let last = inputArr.length - 1;

    if (inputArr[0] === undefined || checkOps.test(inputArr[last])) {
        inputArr.push("0.");
    } else if (!checkDot.test(inputArr[last])) {
        inputArr[last] += ".";
    }
    console.log(inputArr);
    updateScreen();
}

function checkOperator(op) {
    let last = inputArr.length - 1;

    if (inputArr.length === 1) {
        inputArr.push(op);
    } else if (inputArr.length === 2) {
        inputArr[last] = op;
    } else if (inputArr.length === 3) {
        inputArr.push(op);
        doArithmetic(inputArr[0], inputArr[2], inputArr[1], inputArr[3]);
    }
    console.log(inputArr);
    updateScreen();
}

function checkNumber(val) {
    let last = inputArr.length - 1;

    if (equalStatus === true && inputArr.length === 1) {
        inputArr[0] = val;
        updateFontSize(screen, 'default');
        equalStatus = false;
    } else if (inputArr[last] === "0") {
        inputArr[last] = val;
     } else if (checkDot.test(inputArr[last]) || checkNum.test(inputArr[last]) && inputArr[last] !== "0") {
        inputArr[last] += val;
     } else {
        inputArr.push(val);
     }
    console.log(inputArr);
    updateScreen();
}

function doArithmetic(val1, val2, operator, nextOperator) {
    switch(operator){
        case "+": total = parseFloat(val1) + parseFloat(val2); break;
        case "-": total = parseFloat(val1) - parseFloat(val2); break;
        case "*": total = parseFloat(val1) * parseFloat(val2); break;
        case "/": total = parseFloat(val1) / parseFloat(val2); break;
    }
    inputArr.length = 0; //Flush string
    inputArr.push(total.toString());
    if (nextOperator) {
        inputArr.push(nextOperator);
    }
    console.log(inputArr);
    updateScreen();
}

function updateScreen() {
    screen.textContent = inputArr.join(" ");
}

function isOverflown(element) {
    return element.scrollWidth > element.offsetWidth ? true : false;
}

function updateFontSize(element, type) {
    const currentSize = parseInt(window.getComputedStyle(element)['font-size'], 10);
    const newSize = type === 'default' ? 30 : (currentSize - 5);

    element.style.fontSize = `${newSize}px`;

}