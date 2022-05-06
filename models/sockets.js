class Sockets {
  constructor(io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    let io = this.io;
    //On connection
    io.on("connection", (socket) => {
      //Escuchar evento: mensaje-to-server
      socket.on("mensaje-to-server", (data) => {
        console.log(data);
        //Manda el mensaje a todas las conexiones
        io.emit("mensaje-from-server", data);
      });
    });
  }
}

module.exports = Sockets;
