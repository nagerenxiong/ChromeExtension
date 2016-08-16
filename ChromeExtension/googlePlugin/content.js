var current_url = decodeURIComponent(window.location.search).substr(9);
var url_segment = current_url.split('/');
var client_site = url_segment[3];
var msg = {
		client_site: client_site,
	};
chrome.runtime.sendMessage(msg);
chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
	if(request.act == 'user_password'){
		$('#username').val(request.user);
		$('#password').val(request.password);
	}else if(request.act == 'login'){
		$('.btn-submit').trigger('click');
	}
	
});