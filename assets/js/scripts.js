let order = [];
let score = 0;
let clickedOrder = [];
/*
0 - verde
1 - vermelho
2 - amarelo
3 - Azul 
*/

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

// Create a random color order
function shuffleOrder(){
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//Lights the next color

function lightColor(element, number) { 
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

//Check if its the right colors
function checkOrder(){
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nYou Won! Starting next level!`);
        nextLevel();
    }
}

//Click function 
function click(color){
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}


//function that return a color
function createColorElement(color){
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//next level function 

function nextLevel() {
    score++;
    shuffleOrder();
}

//game over function
function gameOver() {
    alert(`Score: ${score}\n You Lost the game\n Click in OK to restart the game`);
    order = [];
    clickedOrder = [];
    playGame();
}

//play game function

function playGame() {
    alert('Welcome to Genius! Starting a new Game');
    score = 0;
    nextLevel();
}


green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);



playGame();