var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Materialize = require('node-materialize');

 fileSystem = require('fs'),
    path = require('path');

  var express = require('express');

app.use(express.static(__dirname + '/'));

 

/*IP address of the sys*/
require('dns').lookup(require('os').hostname(), function (err, add, fam) 
{
  console.log('Use This IP: '+add);
})



app.get('/', function(req, res){


  res.sendfile('/WebContent/index.html');


});


app.get('/msg.mp3', function(req, res){


  res.sendfile('msg.mp3');


});


io.on('connection', function(socket)
{

 



	socket.on('personTyping',function(per)
		{
			io.emit('personTyping', per);
		})

	socket.on('personTypingStop',function(per)
		{
			io.emit('personTypingStop', per);
		})

	socket.on('chat message', function(msg,user)
		{
    		io.emit('chat message', msg,user);
     		console.log('message: ' + msg);
  		});

socket.on('userJoined', function(usr)
		{
    		
     		console.log('user Joined: ' + usr);
     		io.emit('userJnd',usr);
  		});




});


http.listen(3000, function()
	{
  	console.log('listening on *:3000');
	});