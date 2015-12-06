'use strict';
var server = require('express')();
var http = require('http').Server(server);
var io = require('socket.io')(http);
var path = require('path');
var config = require('../config.js');
var port = config.port;
var Home = require('../component/home.js').Home;
var assert = require('assert');

describe("Room", () => {
  let Home = require("../component/home.js").Home;
  let Room = require("../component/room.js").Room;
  let Poker = require("../component/game/poker.js").Poker;
  let Player = require("../component/player.js").Player;

  describe(".shuffle", () => {
    it("keep the amount of deck", () => {
      const room = new Room("test", 4, 52, new Poker(52));
      room.shuffleDeck(100);
      assert.equal(room.state.deck.length, 52);
    })

    it("keep each item in the deck", () => {
      const room = new Room("test", 4, 52, new Poker(52));
      const room2 = new Room("test", 4, 52, new Poker(52));
      room.shuffleDeck(100);
      assert.deepEqual(room.state.deck.sort((x, y) => x - y), room2.state.deck);
    })

    it("result in a non sorted deck", () => {
      const room = new Room("test", 4, 52, new Poker(52));
      const room2 = new Room("test", 4, 52, new Poker(52));
      room.shuffleDeck(100);
      assert.notEqual(room.state.deck, room2.state.deck);
    })
  })

  describe(".addPlayer", () => {
    it("cannot add the same player to the same room", () => {
      const room = new Room("test", 4, 52, new Poker(52));
      const player = new Player("madoka");
      room.addPlayer(player);
      room.addPlayer(player);
      assert.equal(room.state.players.length, 1);
    })
  })

  describe(".divideCard", () => {
    it("divide evenly if possible", () =>{
      const room = new Room("test", 4, 52, new Poker(52));
      const playerNames = ["madoka", "homura", "kyouko", "sayaka"];
      const players = playerNames.map((name) => new Player(name, room));
      const madoka = players[0];
      const homura = players[1];
      for(var i in players){
        room.addPlayer(players[i]);
      }
      room.shuffleDeck(100);
      room.divideCard();
      assert.equal(madoka.state.cards.length, 13);
      assert.equal(homura.state.cards.length, 13);
      assert.notDeepEqual(homura.state.cards, madoka.state.cards);
    })

    it("divide almost evenly, if not possible to divide evenly", () => {
      const room = new Room("test", 4, 52, new Poker(52));
      const playerNames = ["madoka", "homura", "kyouko", "sayaka", "mami"];
      const players = playerNames.map((name) => new Player(name, room));
      const madoka = players[0];
      const mami = players[4];
      for(var i in players){
        room.addPlayer(players[i]);
      }
      room.shuffleDeck(100);
      room.divideCard();
      assert.equal(madoka.state.cards.length - mami.state.cards.length, 1);
    })
  })

})
