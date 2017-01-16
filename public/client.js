/**
 * @type {HTMLButtonElement}
 */
const button = document.getElementsByTagName('button')[0];
/**
 * @type {HTMLInputElement}
 */
const input = document.querySelector('body > input');
let myTurn;
const socket = io.connect('http://localhost:3000');

socket.on('opponent_played', (data) => {
    console.log(data);
    myTurn = input.value;
    
    if (parseInt(data) > parseInt(myTurn)) {
        console.log('Lose');
    } else if (parseInt(data) < parseInt(myTurn)) {
        console.log('Win');
    } else {
        console.log('Draw');
    }
});

const playTurn = () => {  
    console.log('Button Press');
    myTurn = input.value;
    socket.emit("opponent_played", myTurn);
};

['click', 'touchstart'].forEach(event => button.addEventListener(event, playTurn));

