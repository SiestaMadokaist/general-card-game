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
})
