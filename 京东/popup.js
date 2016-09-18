// rome.tabs.executeScript(integer tabId, tabs.InjectDetails details, function callback)
if (chrome.extension.getBackgroundPage().fag) {
	$("ul li:lt(2)").hide();
} else {
	$("ul li:lt(2)").show();
}
$("#queding").click(function() {
	if (chrome.extension.getBackgroundPage().fag) {
		chrome.extension.getBackgroundPage().query();
	}
	else
	{
		login();
	}
})

function login() {
	chrome.extension.getBackgroundPage().start($.trim($("#name").val()), $.trim($("#pass").val()), function(res, callback) {
		if (res == "success") {
			callback();
			$("ul li:lt(2)").hide();
		} else if (res == "error") {
			alert("请联系QQ1274123708购买会员");
		}
	});
	// alert("启动成功！不用再次点击");
}