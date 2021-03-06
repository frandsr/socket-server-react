const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Http server
    this.server = http.createServer(this.app);
    //Configuraciones de sockets
    this.io = socketio(this.server, {
      /*configuraciones*/
    });
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configureSockets() {
    new Sockets(this.io);
  }

  execute() {
    //Inicializar middlewares
    this.middlewares();
    //Configurar sockets
    this.configureSockets();
    //Inicializar server
    this.server.listen(this.port, () => {
      console.log("Puerto corriendo en puerto " + this.port);
    });
  }
}

module.exports = Server;
