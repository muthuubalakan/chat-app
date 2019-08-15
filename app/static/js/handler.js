$(document).ready(function(){
		$("#msg").emojioneArea({
		});
		var socket = io();
		$("#chat").hide();
		$("#people-joined").hide();
		// get the name first
		$("#name").focus();
		$("form").submit(function(event){
			event.preventDefault();
		});
		$("#join").click(function(){
			var name = $("#name").val();
			if (name != "") {
				socket.emit("join", name);
				// $("#login").detach();
				$("#chat").show();
				$("#msg").focus();
				$("#people-joined").show();
				setTimeout(function(){
					$('#people-joined').hide();
				}, 2000);
				ready = true;
				$("#name").val('');
			}
		});
		$("#name").keypress(function(arg) {
			if (arg.which == 13) {
				var name = $("'name").val();
				if (name != "") {
					socket.emit("join", name);
					ready = true;
					$("#login").detach();
					$("#people").show();
					$("#chat").show();
					$("#msg").focus();
				}
			}
		});
		socket.on("update", function(msg) {
			if(ready)
			$("#people-joined").append(msg);
			$("#people").show();
		})
		socket.on("update-people", function(people){
			if(ready) {
				$("#people").empty();
				$.each(people, function(clientid, name) {
					$('#people').append("<li style='list-style: none; font-size: 18px;'>" + "<i class='material-icons'>face</i>" + name + "</li>");
				});
			}
		});
		socket.on("chat", function(who, msg){
			if(ready) {
				$("#msgs").append("<p><strong><span style='color: #007bff;'>" + who + "</span></strong>: " + msg + "</p>");
			}
		});
		socket.on("disconnect", function(){
			$("#msgs").append("<li><strong><span class='text-warning'>The server is not available</span></strong></li>");
			$("#msg").attr("disabled", "disabled");
			$("#send").attr("disabled", "disabled");
		});
		$("#send").click(function(){
			var msg = $("#msg").val();
			socket.emit("send", msg);
			$("#msg").val('');
	
		});
		$("#msg").keypress(function(e){
			if(e.which == 13) {
				var msg = $("#msg").val();
				socket.emit("send", msg);
				$("#msg").val("");
			}
		});
		$("#clear").click(function(){
			try {
				$("#msgs").empty();
				$("#msg").val('');
			} catch (error) {
				console.log("Error: ", error);
			}
		});
	});
