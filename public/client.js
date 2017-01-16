/**
 * @type {HTMLDivElement}
 */
const hands = document.querySelector('div.hands');
const rps = {
    'rock' : 3,
    'paper': 2,
    'scissors': 1,
};
let myTurn;
const socket = io.connect('http://localhost:3000');

socket.on('result', (data) => {
    console.log(data);
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

['click', 'touchstart'].forEach(event => hands.addEventListener(event, playTurn));