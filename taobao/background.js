var className = "";
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.fag == 0) {
		className = request.className;
	} else {
		sendResponse({
			className: className
		});
		console.log(sender.tab.url);
		console.log(sender.tab);
	}

})

