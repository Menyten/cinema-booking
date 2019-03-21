let socketIo = require('socket.io');

module.exports = class SocketIoController {

  constructor(server) {
    this.io = socketIo(server);
    this.listenToSocketConnections();
  }

  listenToSocketConnections() {
    console.log('HEEEEEJ')
    this.io.on('connection', socket => {
      console.log('A NEW CLIENT CONNECTED')
      socket.on('disconnect', () => {
        console.log('A CLIENT DISCONNECTED')
      })
      socket.on('choosing seats', message => {
        console.log(message);
        this.io.emit('seats chosen', message);
      })
    });
  }
}
