/**
 * @type {HTMLDivElement}
 */
const hands = document.querySelector('div.hands');
/**
 * @type {HTMLParagraphElement}
 */
const scoreElem = document.querySelector('p.score');
let score = 0;

const socket = io.connect('/');


/**
 * @param {string} data 
 */
const onData = (data) => {
    console.log(data);
    if(data === 'win') {
        score++;
        scoreElem.innerText = score;
    }
}
socket.on('result', onData);
/**
 * @param {Event} event
 */
const playTurn = (event) => {  
    console.log(event.srcElement.alt);
    socket.emit("user_played", event.srcElement.alt);
};

['click', 'touchstart'].forEach(event => hands.addEventListener(event, playTurn));