chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type == 1) {
		localStorage[request.key]=request.value;
	}
	else if(request.type==2)
	{
		sendResponse(localStorage);
	}
	else if(request.type==3)
	{
		localStorage.removeItem(request.key);
	}
	else if(request.type==4)
	{
		sendResponse(localStorage);
	}
	else if(request.type==5)
	{

		sendResponse(localStorage[request.key]);
	}
	
})