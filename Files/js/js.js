$(document).ready(function(){
  $("#msg").focus();
  $('#help').attr({href:'private/help.php?pass='+$('#pass').attr('value')+'&user='+$('#name').attr('value')});
});
$("#msg").focus();
function getChat() {
var room = $('#room').attr("value");
$.ajax({

  url: 'private/chat.php',data: "room="+room+"&user="+$('#name').attr('value')+"&pass="+$('#pass').attr('value'),
  success: function(data) {
    $('#chat').html(data);
    setTimeout("getChat()",1000);
    $('#viewall').attr({href:'private/chat.php?all=true&room='+room});
  }
});
  $('#help').attr({href:'private/help.php?pass='+$('#pass').attr('value')+'&user='+$('#name').attr('value')});
}
function changeChan(chan) {
$('#room').attr({value:chan});
}
 function checkForm(){  
    return ($('#name').attr("value") != "" && $('#msg').attr("value") != "");
 }  
//on submit event
$("#name").change(function(){
$("#usercheck").load('private/user.php?a=u&d='+$('#name').attr('value'));
});
$("#pass").change(function(){
$("#pcheck").load('private/user.php?a=p&u='+$('#name').attr('value')+'&d='+$('#pass').attr('value'));
});
$("#form").submit(function(){
	if(checkForm()){
		var nick = $('#name').attr("value");
		var message = $('#msg').attr("value");
		var pass = $('#pass').attr("value");
		var msg2 = message.split(" ");
		var oldRoom = $('#room').attr('value');
		if (msg2[0] == "/join") {
		$('#room').attr({value:msg2[1]});
		}
		var room = $('#room').attr("value");
		//we deactivate submit button while sending
		$("#send").attr({ disabled:true, value:"Sending..." });
		$("#send").blur();
		if (room != oldRoom) {
			$("#send").attr({ disabled:false, value:"Shout it!" });
				$("#msg").attr({value:"" });
				$("#msg").focus();
		} else {
		$.ajax({
			type: "POST",url: "private/chat.php", data: "name=" + nick + "&msg=" + 
message+"&pass="+pass+"&room="+room,
			success: function(data){
				$("#send").attr({ disabled:false, value:"Shout it!" });
				$("#msg").attr({value:"" });
				$("#msg").focus();
			}
		 });
		 }
	}
	else alert("Please fill all fields!");
	return false;
});

getChat();

