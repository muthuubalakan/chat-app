'use strict'

const express = require("express");
const fs = require('fs');
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);


const port = 9090;
const path = __dirname + '/app';
const chatHtml = path + '/chat.html';
const staticdir = path + '/static';


var serverError = `
				 <div style="margin-left: 40%; font-size: 20px; margin-top: 20%; font-family:'Roboto',arial,sans-serif; width: 600px; height: 400px;">
				 <h1 style="font-size: 20px>Unexpected Server Error! &#128533</h1>
				 <h6>Please try again later!</h6>
				 </div>
				  `;


function isFile(filename){
	if (fs.promises.access(filename)){
		return true;
	}else{
		return false;
	}
}


app.get("/", async(req, res)=> {
	if (req.method !== 'GET'){
		res.status(400).end();
	}
	if(isFile(chatHtml) == false){
		res.status(500).send(serverError);
	}
	res.sendFile(chatHtml);
});


app.use('/static', express.static(staticdir))


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


http.listen(port, ()=> {
	console.log(`Server running at ${port}/`);
}
);
