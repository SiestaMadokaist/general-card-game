"use strict";
require("babel/register")({});

const server = require("./server.jsx");
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
})
