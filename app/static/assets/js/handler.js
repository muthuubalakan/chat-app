
$(document).ready(function(){
	var socket = io();
		$("#msg").emojioneArea({});
		$("#chat").hide();
		$("#people-joined").hide();
		$("#name").focus();
		$("form").submit(function(event){
			event.preventDefault();
		});

		$("#join").click(function(){
			var name = $("#name").val();
			if (name != "") {
				socket.emit("join", name);
				$("#chat").show();
				$("#msg").focus();
				$("#people-joined").show();
				setTimeout(function(){
					$('#people-joined').hide();
				}, 6000);
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
			$("#people-joined").html('<p>' + msg + '</p>');
			$("#people").show();
		})


		socket.on("update-people", function(people){
			if(ready) {
				$("#people").empty();
				$.each(people, function(clientid, name) {
					$('#people').append("<li style='list-style: none; font-size: 18px;'>" + "<i class='material-icons' style='vertical-align:middle;'>face</i>" + name + "</li>");
				});
			}
		});


		socket.on("chat", function(who, msg){
			$('#msg').val('');
			if(ready) {
				$("#msgs").append("<p><strong><span style='color: #007bff;'>" + who + "</span></strong>: " + msg + "</p>");
			}
		});


		socket.on("disconnect", function(){
			$("#msgs").append("<li><strong><span class='text-warning'>The server is not available</span></strong></li>");
			$("#msg").attr("disabled", "disabled");
			$("#send").attr("disabled", "disabled");
		});


		$("#send").click(()=>{
			var message = $("#msg").val();
			socket.emit("send", message);
			$("#msg").html('');
			$("#msg").text('');
			$("#msg").val('0');
		});
		
		$("#clear").click(function(){
			$("#msgs").empty();
			$("#msg").empty();

		});
	});
