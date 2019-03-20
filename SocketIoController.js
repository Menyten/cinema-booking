let socketIo = require('socket.io');

module.exports = class SocketIoController {

  constructor(server) {
    this.io = socketIo(server);
    this.listenToSocketConnections();
  }

  listenToSocketConnections() {
    console.log('HEEEEEJ')
    this.io.on('connection', socket => {
      console.log('A NEW CLIENT CONNECTED YOU FUCK!')
      socket.on('disconnect', () => {
        console.log('A CLIENT DISCONNECTED YOU FUCK!')
      })
    });
  }
}
