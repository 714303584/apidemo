

function getBodyHeight(percentum){
	return document.body.scrollHeight*percentum;
}

function getBodyWight(percentum){
	return document.body.scrollWidth *percentum;
}



function post(postUrl,param,successHandler,errorHandler){
	var token = sessionStorage.getItem("token"); 	
	$.ajax({
		type: "POST",
		contentType: "application/json", 
		url: postUrl,
    	data:  param,
		dataType:'json',
		cache: false,
		headers: {
            "token":token
        },
		success:function ( data ) {
			successHandler(data);
		},
		error: function ( data ) {
			console.log(data);
			var errCode = data.responseText.errcode;
			var errMsg = data.responseText.errmsg;
			if(errCode == "50007"){
				window.location.href="login.html";
			}
			errorHandler(data.responseText);
		}
	});
}


function get(getUrl,successHandler,errorHandler){
	var token = sessionStorage.getItem("token"); 	
	$.ajax({
		type: "GET",
		contentType: "application/json", 
		url: getUrl,
		dataType:'json',
		cache: false,
		headers: {
            "token":token
        },
		success:function(data){
			successHandler(data);
		},
		error: function(data){
			console.log(data);
			var errJson = JSON.parse(data.responseText);
			var errCode = errJson.errcode;
			var errMsg = errJson.errmsg;
			if(errCode == "50007"){
				alert(errMsg);
				window.location.href="login.html";
			}
			errorHandler(errJson);
		}
	});
}


function del(deleteUrl,successHandler,errorHandler){
	var token = sessionStorage.getItem("token"); 	
	$.ajax({
		type: "DELETE",
		contentType: "application/json", 
		url: deleteUrl,
		dataType:'json',
		cache: false,
		headers: {
            "token":token
        },
		success:function(data){
			successHandler(data);
		},
		error: function(data){
			console.log(data);
			var errJson = JSON.parse(data.responseText);
			var errCode = errJson.errcode;
			var errMsg = errJson.errmsg;
			if(errCode == "50007"){
				alert(errMsg);
				window.location.href="login.html";
			}
			errorHandler(errJson);
		}
	});
}

function delSucc(id){
	$("#"+id).remove();
}

function demoError(errJson){
	var errCode = errJson.errcode;
	var errMsg = errJson.errmsg;
	alert(errMsg);
}












