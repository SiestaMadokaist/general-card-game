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
  let Poker = require("../component/game/poker.js").Poker;
  describe(".createRoom", () => {
    it("should make the room", () => {
      var home = new Home(io);
      var roomName = "test-room";
      home.createRoom(roomName, 4, 52, Poker);
      assert.equal(roomName, home.getRoom(roomName, (room) => room.name() ));
    })

    it("shouldn't override an already existing room", () => {
      var home = new Home(io);
      var roomName = "test-room";
      home.createRoom(roomName, 4, 52, Poker);
      home.createRoom(roomName, 3, 52, Poker);
      assert.equal(4, home.getRoom(roomName, (room) => room.playerLimit()));
    })

    it("shouldn't create another room", () => {
      var home = new Home(io);
      var roomName = "test-4room";
      home.createRoom(roomName, 4, 52, Poker);
      home.createRoom(roomName, 3, 52, Poker);
      assert.equal(1, home.state.rooms.length);
    })
  })
})
