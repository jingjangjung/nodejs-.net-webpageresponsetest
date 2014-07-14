/*
//legend: req = request; res = response;
//emit: send it back to client

Server#emit

Emits an event to all connected clients. The following two are equivalent:

 var io = require('socket.io');
io.sockets.emit('an event sent to all connected clients');
io.emit('an event sent to all connected clients');

on the opposite
io.on('same name of an event')
*/

var http = require('http');
var fs = require('fs');
var socketio = require('socket.io');
var exec = require('child_process').exec;


var server = http.createServer(serverGenerated).listen(1337);
console.log('SERVER ACTIVATED');
console.log('Server running at http://127.0.0.1:1337');

//for serving
function serverGenerated(request, response){
    response.writeHead(200,{'Content-type':'text/html'});
    response.end(fs.readFileSync(__dirname + '/index.html'));
}

//socket.io server side
var webSocket = socketio.listen(server);
webSocket.sockets.on('connection',function(socket){

    //socket.on('testClick', function(url_repeat){
    socket.on('testClick', function(urlparam){
        exec("requestwebpage " + urlparam, function(error,data_io,err_io){
            console.info('"WEB RESPONSE TESTING ACTIVATED"');

            //emit(script-side): activate the event on the other-side
            //if remove .sockets it will not log
            webSocket.sockets.emit('webResponseConsole',data_io);
            });
    });
});