var server = require('express')();
var http = require('http').Server(server);
var io = require('socket.io')(http);
var path = require('path');
var config = require('./config.js');
var specs = require('./spec/spec.js');
var port = config.port;

// server.get('/', function(req, res){
//   res.sendFile(path.join(__dirname, './view/index.html'));
// });

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });

// http.listen(port, function(){
//   console.log('listening on port 3000...');
// });

