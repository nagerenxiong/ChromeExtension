var index = 0;
var fag = false;

function start(id, callback) {
	$.ajax({
			url: 'https://media.jd.com/gotoadv/goods?pageIndex=&pageSize=10&property=&sort=&adownerType=&pcRate=&wlRate=&category=&category1=0&condition=0&fromPrice=&toPrice=&keyword=' +
				id,
			type: 'get',
			async: false
		})
		.done(function(data) {
			callback(data);
		})
		.fail(function(msg) {
			callback("error");
		})
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	var id = request.id;
	start(id, function(data) {
		if (data == "error") {
			sendResponse("error");
			return;
		}
		if (data.indexOf("没有查询到符合条件的数据") >= 0) {
			sendResponse("无");
			return;
		}
		var p1 = data.indexOf("无线：");
		var p2 = data.indexOf("无线：", p1 + 2);
		var d2 = data.indexOf("</td>", p2);
		var p3 = data.indexOf("无线：", p2 + 2);
		var d3 = data.indexOf("</td>", p3);
		var k1 = data.substring(p2, d2);
		var k2 = data.substring(p3, d3);
		var pk2 = k2.indexOf("￥");
		var v2 = $.trim(k2.substr(pk2 + 1));
		var pk1 = k1.indexOf("：");
		var v1 = $.trim(k1.substr(pk1 + 1));
		sendResponse({
			v1: v1,
			v2: v2
		});
	});
})


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
