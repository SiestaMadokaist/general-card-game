'use strict';
var server = require('express')();
var http = require('http').Server(server);
var io = require('socket.io')(http);
var path = require('path');
var config = require('../config.js');
var port = config.port;
var Home = require('../component/home.js').Home;
var assert = require('assert');

describe("Home", () => {
  let Home = require("../component/Home.js").Home;
  describe(".createRoom", () => {
    it("should make the room", () => {
      var home = new Home(io);
      var roomName = "test-room";
      home.createRoom(roomName, 4);
      assert.equal(roomName, home.getRoom(roomName, (room) => room.name() ));
    })

    it("shouldn't override an already existing room", () => {
      var home = new Home(io);
      var roomName = "test-room";
      home.createRoom(roomName, 4);
      home.createRoom(roomName, 3);
      assert.equal(4, home.getRoom(roomName, (room) => room.playerLimit()));
    })

    it("shouldn't create another room", () => {
      var home = new Home(io);
      var roomName = "test-room";
      home.createRoom(roomName, 4);
      home.createRoom(roomName, 3);
      assert.equal(1, home.state.rooms.length);
    })
  })
})
