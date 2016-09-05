chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.cmd == "init") {
		console.log("init");
		localStorage.setItem("url", request.url);
		localStorage.setItem("id", request.id);
		localStorage.setItem("start", request.start);
		localStorage.setItem("email", request.email);
	} else if (request.cmd == "get") {
		sendResponse({
			url: localStorage.getItem("url"),
			id: localStorage.getItem("id"),
			start: localStorage.getItem("start"),
			email: localStorage.getItem("email")
		});
	} else if (request.cmd = 'stop') {
		localStorage.setItem("start", 0);
	}
});