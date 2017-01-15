/**
 * @type {HTMLButtonElement}
 */
const button = document.getElementsByTagName('button')[0];
const socket = io.connect('http://localhost:3000');

socket.on('message',function(data) {
    console.log(data);
});

const generateRoom = () => {  
    const room = 'room';
    console.log('Button Press');

    socket.emit("message", function(data) {
      console.log(data);
  });
};

['click', 'touchstart'].forEach(event => button.addEventListener(event, generateRoom));

