var className = "";
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type == 1) {
		ajax(request.url, function(html) {
			var m = html.indexOf("货号:");
			var k = html.indexOf("</li>", m);
			var g = html.indexOf(";", m) + 1;
			if (m > 0) {
				sendResponse(html.substring(g, k));
			} else {
				sendResponse("无");
			}
		});
	}
})

function ajax(url, callback) {
	$.ajax({
			url: url,
			type: 'get',
			async: false
		})
		.done(function(result) {
			callback(result);
		})
		.fail(function() {
			console.log("error");
		})
}

chrome.tabs.onUpdated.addListener(function(x, x1, x2) {
	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {
			next: true
		}, function(response) {
		});
	});
})