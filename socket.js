const socketIO = require('socket.io');
let io;

function connectEvents() {
  io.on('connection', (socket) => {
    socket.on('message', (message) => {
      io.emit('message-broadcast', message);
    });
  });
}

function init(server) {
  io = socketIO(server);
  connectEvents();
}

module.exports = init;
