// Define variable 
// Express is a node js web framework
var app = require("express")();
var http = require("http").Server(app);
var port = 9090;
var host = "127.0.0.1"

// bind with socket. Use socket.io
var io = require("socket.io")(http);

var people = {};

// __dirname will get you current path
// Serve html file
app.get("/", function(req, res){
	res.sendFile(__dirname + '/chat.html');
});

// check socket connection
io.on("connection", function(socket){
	socket.on("join", function(name){
		people[socket.id] = name;
		socket.username = name;
		io.sockets.emit("update", name + " has joined the server.")
		io.sockets.emit("update-people", people);
	});

	socket.on("send", function(msg){
		io.sockets.emit("chat", people[socket.id], msg);
	});
	socket.on("disconnect", function(){
		io.sockets.emit("update", people[socket.id] + "disconnected");
		delete people[socket.id];
		io.sockets.emit("update-people", people);
	});
});

// Define the server
http.listen(port, function(){
	console.log("listening on port:", port);
});