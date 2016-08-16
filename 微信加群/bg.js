var index = 0
function start() {
	chrome.tabs.query({
		url:'https://*.weixin.qq.com/*',
		status: 'complete'
	}, function(tabs) {
		closeScript(tabs);
	})
}
function closeScript(tabs) {
	if (index < tabs.length) {
		var tabId = tabs[index].id
		chrome.tabs.executeScript(tabId, {
			code: 'document.getElementsByTagName("a")[0].click(); setTimeout(function() {window.close(); }, 300)'
		});
		index++;
		setTimeout(function() {
			closeScript(tabs);
		}, 300);
	} else {
		index = 0;
	}
}