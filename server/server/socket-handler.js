"use strict";
import socket from "socket.io";

export default class SocketHandler {
  constructor(server, namespace="/"){
    this.props = {
      io: socket(server).of(namespace)
    }
  }

  _io(){ return this.props.io }

  prepare(){
    this._io().on("connection", (client) =>{
      client.on("join", this.onJoin(client));
      client.on("client+chat", this.onChat(client));
      client.on("play", this.onPlay(client));
      client.on("pingtest", this.onPingTest(client));
    })
  }

  onJoin(client){
    return (data) => {
      const { roomId } = data;
      client.join(roomId);
    }
  }

  onChat(client){
    return (data) => {
      console.log("chat %j", data);
      this
        ._io()
        .to(data.roomId).emit("server+chat", data)
    }
  }

  onPingTest(client){
    return (data) => {
      console.log(`pingTest %j`, data)
    }
  }

  onPlay(client){
    return (data) => {
      this._io().to(data.roomId).emit("message", data);
    }
  }

}
