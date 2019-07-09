var stompClient = null;
var socket = null;
var from = "";

function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#chatMessages").html("");
}

function connect() {
    // create the SockJS WebSocket-like object
	socket = new SockJS('/bots-message-channel');
	
	// specify that we're using the STOMP protocol on the socket
    stompClient = Stomp.over(socket);
    

    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        
        //Topics of messages that will sent data for SendTO
        stompClient.subscribe("/topic/guestnames", function (greeting) {
        	showJoinedName(JSON.parse(greeting.body).message);
        });
        
        stompClient.subscribe("/topic/bots", function (greeting) {
                    showTyping(JSON.parse(greeting.body).message);
        });
        
        stompClient.subscribe('/topic/user', function (greeting) {
            showMessage(JSON.parse(greeting.body).message);
        });
        
//        stompClient.subscribe('/topic/errors', function (greeting) {
//            showErrors(JSON.parse(greeting.body).content);
//        });
        
        sendName();
    });
    
}

function disconnect() {
    if (stompClient !== null) {
    	$("#members").append("<tr><td>" + from + " just left</td></tr>");
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

function showTyping(message) {
	$("#typingUpdates").html("<tr><td>Someone is typing...</td></tr>");
}

function sendMessage() {
  stompClient.send("/app/user-message", {}, JSON.stringify({'message': $("#message").val()}));
}

function showMessage(message) {
    $("#chatMessages").append("<tr><td>" + message + "</td></tr>");
    $("#typingUpdates").html("<tr><td>&nbsp;</td></tr>");
    $("#message").val("");
}
	
function sendName() {
    stompClient.send("/app/guestjoin", {}, JSON.stringify({'message': $("#from").val()}));
}

function showJoinedName(message) {
	from = message;
    $("#members").append("<tr><td>" + message + " just joined</td></tr>");
}

function showErrors(message) {
	$("#errorMessages").html("<tr><td>" + message + "</td></tr>");
}

$(function () {
    $("form").on('submit', function (e) {
        e.preventDefault();
    });
    
    $( "#connect" ).click(function() { connect(); });
    
    $( "#disconnect" ).click(function() { disconnect(); });
    
    $( "#send" ).click(function() { sendMessage(); });

    
    $("#message").keyup(function (e)  {
		stompClient.send("/app/bots-message", {}, JSON.stringify({'message': $("#message").val()}));
	});
});

