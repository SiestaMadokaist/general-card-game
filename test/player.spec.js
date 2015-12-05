'use strict';
var server = require('express')();
var http = require('http').Server(server);
var io = require('socket.io')(http);
var path = require('path');
var config = require('../config.js');
var port = config.port;
var Home = require('../component/home.js').Home;
var assert = require('assert');

describe("Player", () => {
  let Player = require("../component/player.js").Player;
  let kingOfSpades = {name: "Spade", value: "King"};
  let asOfDiamond = {name: "Diamond", value: "As"};
  describe(".representCard", () => {
    it("represent correctly the card", () => {
      var player = new Player("madoka");
      assert.deepEqual(kingOfSpades, player.representCard(51));
      assert.deepEqual(asOfDiamond, player.representCard(0));
    })
  })

  describe(".takeCard", () => {
    it("correctly add card", () => {
      var player = new Player("madoka");
      player.takeCard(51);
      assert.deepEqual(kingOfSpades, player.representCard(player.cards()[0]));
    })
  })

})
