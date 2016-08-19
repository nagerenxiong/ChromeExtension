// rome.tabs.executeScript(integer tabId, tabs.InjectDetails details, function callback)
$("#queding").click(function() {
	chrome.extension.getBackgroundPage().start($.trim($("#name").val()),$.trim($("#pass").val()),function(res,callback){
		if(res=="success")
			callback();
		else if(res=="error")
			alert("请联系tb003095_2013购买会员");
	});
	// alert("启动成功！不用再次点击");
})
