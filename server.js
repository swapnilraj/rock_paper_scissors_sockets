const express = require('express');
const app = express();

app.use(express.static('./public'));


const server = app.listen(3000, () => {
    console.log(server.address().port);
});

const io = require('socket.io')(server);  


io.on('connection', function(socket){
  console.log('user connected');
  socket.on('message', (data) => {
    console.log('Received')
    socket.broadcast.emit('message', data);
  });
});

