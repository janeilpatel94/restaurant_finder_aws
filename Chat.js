class ChatMessage{
	constructor(){
		this._Message = "";
		this._From = "";
		this._Side = "";
	}
	set Message(msg){
		this._Message = msg;
	}
	set From(frm){
		this._From = frm;
	}
	set Side(sde){
		this._Side = sde;
	}
	readMessageAsHTML(){
		var htmlMsg = "";
		if(this._Side.toUpperCase()=="LEFT")
			htmlMsg = "<div id='leftMessage'><div class='arrow'></div><div class='reference'>" + this._From + "</div><div class='messageText'> " + this._Message + " </div></div><br />";
		else
			htmlMsg = "<div id='rightMessage'><div class='arrow'></div><div class='messageText'> " + this._Message + " </div><div class='reference'>" + this._From + "</div></div><br />";
		return htmlMsg;
	}
}
function sendMessage(data){
	var cMsg = new ChatMessage();
	var msgWindow = document.getElementById("messagesWindow");
	//var msg = document.getElementById("chatmsg");
	cMsg.Message = data;
	// alert(cMsg.Message);
	// cMsg.From = from;
	cMsg.Side = "LEFT";
	msgWindow.innerHTML += cMsg.readMessageAsHTML();
	//msg.value = "";
	msgWindow.scrollTop = msgWindow.scrollHeight - msgWindow.clientHeight;
}

// Our message

function sendMessage1(data){
	var cMsg = new ChatMessage();
	var msgWindow = document.getElementById("messagesWindow");
	//var msg = document.getElementById("chatmsg");
	cMsg.Message = data;
	// alert(cMsg.Message);
	// cMsg.From = from;
	cMsg.Side = "RIGHT";
	msgWindow.innerHTML += cMsg.readMessageAsHTML();
	//msg.value = "";
	msgWindow.scrollTop = msgWindow.scrollHeight - msgWindow.clientHeight;
}