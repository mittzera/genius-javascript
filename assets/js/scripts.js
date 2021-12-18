const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');

let scoret = 1;
function incrementScore() { 
    document.getElementById("score").innerText = scoret++;


}
function decrementScore() {
    document.getElementById("score").innerText = scoret = 0;
}

function gameOver(){
    alert('You Lost this round!');
    decrementScore();
    startFlashing();
}
const getRandomPanel = () => {
    const panels = [ 
        green, 
        red, 
        yellow, 
        blue
    ]
    return panels[parseInt(Math.random() * panels.length)]
    
}

const sequences = [ 
    getRandomPanel(),
    getRandomPanel(),
    getRandomPanel(),
    getRandomPanel(),
];
let sequenceToGuess = [...sequences];


const flash = panel => {
    return new Promise((resolve, reject) => {
        panel.className += 'selected';
        setTimeout(() => {
            panel.className = panel.className.replace(
                'selected', 
                ''
                );
                setTimeout(() => {
                    resolve();
                }, 250);
        }, 1000);
    });
};

let canClick = false;

const panelClicked = panelClicked => {

    if(!canClick) return;
    const expectedPanel = sequenceToGuess.shift();
    if(expectedPanel === panelClicked){
        if(sequenceToGuess.length === 0) {
            //Start New Round
            sequences.push(getRandomPanel());
            sequenceToGuess = [...sequences];
            alert('You won this round!');
            incrementScore();
            startFlashing();
           
        } 
    } else {
          gameOver();
        }
    };
const startFlashing = async() => {
    canClick = false;
    for(const panel of sequences){
        await flash(panel);
    }
    canClick = true;
}

startFlashing();    