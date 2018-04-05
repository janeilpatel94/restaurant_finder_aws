// $(function(){
// 	var params = {'Access-Control-Allow-Origin':'*'};
// 	$.ajax({

//   type: "POST",
//   url: 'https://nrxwqwttvb.execute-api.us-east-1.amazonaws.com/testing',
//   data: {
//   			"key3": "Hey",
//   			"key2": "value2",
//   			"key1": "Hey"} ,
//   success: function(){
//   	alert('success');
//   },


// 	})
// });

$(document).ready(function() {
    $('#msgsend').on('click', function () {
    	// var msg = $('#chatmsg').val();
    	// alert(msg);
    	//var msgWindow = document.getElementById("messagesWindow");
    	sendMessage1($('#chatmsg').val());
		$.ajax({
			url:"https://drmrq4bmdd.execute-api.us-east-1.amazonaws.com/Development/chatbot",
			type:'POST',
			crossDomain: true,
			// Access-Control-Allow-Credentials: true,
			contentType: 'application/json',
			dataType: 'json',
			data:JSON.stringify({"key1": $('#chatmsg').val().toUpperCase()}),				 
			//data:JSON.stringify({}),
			success:function(data){
				console.log("success\n");
				// alert(data);
				sendMessage(data);
				$('#chatmsg').val("");				},
			error:function(data){
				//alert(JSON.stringify(data));
				alert("error");
			}
			});
        });
	});