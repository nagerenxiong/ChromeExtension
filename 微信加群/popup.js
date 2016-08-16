// rome.tabs.executeScript(integer tabId, tabs.InjectDetails details, function callback)
$("#queding").click(function() {
	chrome.extension.getBackgroundPage().start();
	// alert("启动成功！不用再次点击");
})
