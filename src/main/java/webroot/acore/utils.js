

function getBodyHeight(percentum){
	return document.body.scrollHeight*percentum;
}

function getBodyWight(percentum){
	return document.body.scrollWidth *percentum;
}


/**
 * 
 * @param postUrl Address requested by POST request 
 * @param param  Parameters for Request Submission 
 * @param successHandler  Successful handling function 
 * @param errorHandler Error handling function 
 */
function post(postUrl,param,successHandler,errorHandler){
	var token = sessionStorage.getItem("token"); 	
	$.ajax({
		type: "POST",
		contentType: "application/json", 
		url: postUrl,
    	data:  JSON.stringify(param),
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


/**
 * Query method  
 * @author zhuss
 * @param gettUrl Address requested by GET request 
 * @param successHandler  Successful handling function 
 * @param errorHandler Error handling function 
 */
function get ( getUrl, param, successHandler, errorHandler ) {
	var token = sessionStorage.getItem("token"); 	
	$.ajax({
		type: "GET",
		contentType: "application/json", 
		url: getUrl,
		data:  param,
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
			
			//get error messages 
			var errJson = JSON.parse(data.responseText);
			var errCode = errJson.errcode;
			var errMsg = errJson.errmsg;
			//50007 is the authentication error 
			//Need to jump to the login page 
			if(errCode == "50007"){
				alert(errMsg);
				window.location.href="login.html";
			}
			errorHandler(errJson);
		}
	});
}


/**
 * Delete method  
 * @author zhuss
 * @param deleteUrl Address requested by DELETE request 
 * @param successHandler  Successful handling function 
 * @param errorHandler Error handling function 
 */
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



/**
 * default Error Handler
 * @param errJson Error Message
 */
function demoError(errJson){
	var errCode = errJson.errcode;
	var errMsg = errJson.errmsg;
	alert(errMsg);
}


/**
 * Whether the judgment is empty 
 * @param value
 * @returns {Boolean}
 */
function isEmpty(value){
	if (value !== null && value !== undefined && value !== '' && typeof(reValue) !== "undefined") { 
		return true;
	} 
	return false;
}





var locat = (window.location+'').split('/'); 
$(function(){if('main'== locat[3]){locat =  locat[0]+'//'+locat[2];}else{locat =  locat[0]+'//'+locat[2]+'/'+locat[3];};});


//菜单状态切换
var fmid = "fhindex";
var mid = "fhindex";
function siMenu(id,fid,MENU_NAME,MENU_URL){
	if(id != mid){
		$("#"+mid).removeClass();
		mid = id;
	}
	if(fid != fmid){
		$("#"+fmid).removeClass();
		fmid = fid;
	}
	$("#"+fid).attr("class","active open");
	$("#"+id).attr("class","active");
	top.mainFrame.tabAddHandler(id,MENU_NAME,MENU_URL);
	if(MENU_URL != "druid/index.html"){
		jzts();
	}
}










