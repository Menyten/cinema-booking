let socketIo = require('socket.io');

module.exports = class SocketIoController {

  constructor(server) {
    this.io = socketIo(server);
    this.listenToSocketConnections();
  }

  listenToSocketConnections() {
    this.io.on('connection', socket => {
      socket.on('disconnect', () => {
      })
      socket.on('choosing seats', message => {
        socket.broadcast.emit('seats chosen', message);
      })
    });
  }
}
