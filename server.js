
//sudo npm init
//sudo npm install express --save
//sudo npm install socket.io --save

//node server.js  (ctrl 'c' to exit server)
var connection = 0;

var express = require('express');
var app = express();
server = app.listen(8080); //port 3000

app.use(express.static('public'));

console.log("server running");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
    socket.emit('con',connection);
    connection++;

    console.log('new connection: ' + socket.id);

    socket.on('mouse', mouseMsg);

    socket.on('refresh', refresh);

    socket.on('connect_to', connect_to);

    function mouseMsg(data){
        socket.broadcast.emit('mouse', data);
       // io.sockets.emit('mouse',data);
        console.log(data);
    };

    function refresh(){
        console.log('Refresh: ' + socket.id);

    };

    function connect_to(data){
        console.log("connceting message: " + data);
        socket.broadcast.emit('chat',socket.id + ":  " +data);
    };


}