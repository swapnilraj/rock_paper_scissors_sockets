const express = require('express');
const app = express();

app.use(express.static('./public'));


const server = app.listen(3000, () => {
    console.log(server.address().port);
});
const io = require('socket.io')(server);  

/**
 * @type {{hand: string, socket: SocketIO.Socket}[]}
 */
let clientsHand = [];
let index = 0;
const values = {
    'rock' : 3,
    'paper': 2,
    'scissors': 1,
};

/**
 * @param {{hand: string, socket: SocketIO.Socket}[]} clientsHand
 * Game Logic
*/
const result = (clientsHand) => {

  const firstHand = clientsHand[0];
  const secondHand = clientsHand[1];

  if(values[firstHand['hand']] < values[secondHand['hand']]){
    firstHand['socket'].broadcast.emit('result', 'win');
    secondHand['socket'].broadcast.emit('result', 'lose');
  }
  else if(values[firstHand['hand']] > values[secondHand['hand']]) {
    firstHand['socket'].broadcast.emit('result', 'lose');
    secondHand['socket'].broadcast.emit('result', 'win');
  } else {
    io.sockets.emit('result', 'draw');
  }
};

/**
 *   User interaction handler
 */
io.on('connection', (socket) => {
  socket.on('user_played', (data) => {
    console.log(socket.id + ' ' + data);
    clientsHand[index++] = {'hand': data,
                              'socket': socket};
    if (!(index % 2) && (index != 0)) {
      index = 0;
      result (clientsHand);
    }
    console.log('Received')
  });
});