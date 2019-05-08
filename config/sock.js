var express = require('express');
    app = express();
    server = require('http').createServer(app);
    io = require('socket.io').listen(server);
var api = require('./api');

var conn = function() {
  console.log("this is nice");

  server.listen(process.env.PORT || 3000);
  app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
  });
};

var fromClient = function() {

io.on('connection', function (socket) {
  socket.on('fromClient', function (data) {
    console.log(data.client);
         api.getRes(data.client).then(function(res){
           console.log('response', res);
            socket.emit('fromServer', { server: res });
         });
  });
});
}
module.exports = {conn,fromClient}
