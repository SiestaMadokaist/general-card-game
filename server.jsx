//	Customization

// Librairies
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import * as reducers from 'reducers';
import routes from 'routes';
import { cssPath } from 'config';
import path from 'path';
// import http from 'http';

const app = express();

const PROJECT_ROOT = path.resolve(__dirname, "..");
const ASSETS_ROOT = path.join(PROJECT_ROOT, "public/assets");
app.use("/static", express.static("public"));
app.use((req, res) => {
  const location = createLocation(req.url);
  const reducer = combineReducers(reducers);
  const store = createStore(reducer);

  match({routes, location}, (err, redirectLocation, renderProps) => {
    if(err){
      console.error(err);
      return res.status(500).end("Internal Server Error.");
    }
    if(!renderProps){
      return res.status(404).end("Not Found.")
    }

    const InitialComponent = (
      <Provider store={store}>
        <RoutingContext {...renderProps} />
      </Provider>
    );

    const initialState = store.getState();
    const componentHTML = renderToString(InitialComponent);

    const HTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Ramadocard-game</title>
        <link href=${cssPath} rel="stylesheet" type="text/css">
        <script type="application/javascript">
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
      </html>
    `
    res.end(HTML);
  })

})

module.exports = app;

// Component
// const SevenSocketHandler = require("./component/game/seven/io.js");

// UI
// const Home = require("./ui/home.jsx");

// const server = http.createServer(app);
// SevenSocketHandler.listen(server);

// app.get("/", (req, res) => {
  // const reactHTML = React.renderToString(Home({}));
  // res.render("index.ejs", {reactOutput: reactHTML})
// })

// app.set('views', __dirname + '/views');
// app.set('view engine', 'jade');
// app.set("view options", { layout: false });
//
// app.use(express.static(__dirname + '/public'));

// app.get('/', function(req, res){
  // res.render('home.jade');
// });

// server.listen(appPort);

// io.of("/seven").on("connection", (socket) => {
  // socket.on("play", (data) => {
    // const player = Player.fetch({
      // playerName: data.playerName,
    // })
    // player.playOne(data.cardId, {
      // suit: data.suit,
      // direction: data.direction
    // })
  // })
// 
  // socket.on("start", (data) => {
    // const room = Room.fetch({
      // roomName: data.RoomName
    // });
    // room.start({
      // cardLimit: data.cardLimit
    // });
  // })
//
  // socket.on("join", (data) => {
    // const player = Player.fetch({
      // playerName: data.playerName,
      // playerSocket: socket
    // })
    // const room = Room.fetch({
      // game: Seven,
      // roomName: data.roomName,
      // playerLimit: data.playerLimit
    // });
    // player.join(room);
    // socket.join(data.roomName);
    // console.log(`${player.name()} joined  ${room.roomName()}`)
  // })
// })
