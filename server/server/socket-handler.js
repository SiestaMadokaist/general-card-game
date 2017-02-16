"use strict";
import socket from "socket.io";

export default class SocketHandler {
  static register(server){
    this.socketRef = socket(server);
  }

  constructor(namespace="/"){
    // assert(this.socketRef !== undefined, "you must first register the server using SocketHandler.register(server)")
    this.props = {
      io: this.socketRef().of(namespace)
    }
  }

  socketRef(){
    return SocketHandler.socketRef;
  }

  _io(){ return this.props.io }

}
