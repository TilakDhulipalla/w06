var express = require('express');
var app = express();
var server = require('http').createServer(app);

var io = require('socket.io')(server);
var path = require('path');


// on getting a request to /, do the following
app.get('/', function (req, res) {
  app.use(express.static(path.join(__dirname)));   
     res.sendFile(path.join(__dirname, '../w06/assets', 'index.html'));

});
io.on('connection', function(socket){ 
      socket.on('chatMessage', function(from, msg){
           io.emit('chatMessage', from, msg);  
      });
      socket.on('notifyUser', function(user){
           io.emit('notifyUser', user);  
      });
});

// Listen for an application request on port 8081
server.listen(8081, function () {
  console.log('listening on http://127.0.0.1:8081/');
});
