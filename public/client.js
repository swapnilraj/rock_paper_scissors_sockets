/**
 * @type {HTMLDivElement}
 */
const hands = document.querySelector('div.hands');
const socket = io.connect('/');

socket.on('result', (data) => {
    console.log(data);
});
/**
 * @param {Event} event
 */
const playTurn = (event) => {  
    console.log(event.srcElement.alt);
    socket.emit("user_played", event.srcElement.alt);
};

['click', 'touchstart'].forEach(event => hands.addEventListener(event, playTurn));