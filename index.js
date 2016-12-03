"use strict";
require("babel/register")({});

const appServer = require("./server.jsx");
const socket = require("socket.io");
const http = require("http");
// const PORT = process.env.PORT || 3000;
// const server = http.createServer(appServer);
// server.listen(PORT);

// server.listen(PORT, () => {
  // console.log("Server listening on port " + PORT);
// })

 // const io = socket(server);
 // io.on("connection", (client) => {
   // console.log(client);
   // client.on("pping", (data) => {
     // console.log(`pinged: ${data}`)
   // })
 // })
