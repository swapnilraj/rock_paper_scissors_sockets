/**
 * @type {HTMLButtonElement}
 */
const button = document.getElementsByTagName('button')[0];
/**
 * @type {HTMLInputElement}
 */
const input = document.querySelector('body > input');
/**
 * @type {HTMLDivElement}
 */
const hands = document.querySelector('div.hands');
const rps = {
    'rock' : 1,
    'paper': 2,
    'scissors': 3,
};
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
/**
 * @param {Event} event
 */
const playTurn = (event) => {  
    console.log(event.srcElement.alt);
    myTurn = rps[event.srcElement.alt];
    console.log(myTurn);
    socket.emit("user_played", myTurn);
};

['click', 'touchstart'].forEach(event => button.addEventListener(event, playTurn));
['click', 'touchstart'].forEach(event => hands.addEventListener(event, playTurn));