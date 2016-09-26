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
	if (request.type == 1) {
		var id = request.id;
		var url = request.url;
		$("#frame").attr("src", url)
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
			var v2 = $.trim(k2.substr(pk2));
			var pk1 = k1.indexOf("：");
			var v1 = $.trim(k1.substr(pk1 + 1));
			sendResponse({
				v1: v1,
				v2: v2
			});
		});
	} else if (request.type == 2) {
		$.ajax({
				url: 'http://121.40.94.246/jd/goods.php',
				type: 'post',
				async: false,
				data: {
					commission: request.commission,
					scale: request.scale,
					link: request.link
				}
			})
			.done(function(data) {
				if (data == '{"msg":"success"}') {
					sendResponse("success");
				} else {
					sendResponse("error");
				}
			})
			.fail(function(msg) {
				sendResponse("error");
			})
	} else if (request.type == 3) {
		var commentUrl = request.commentUrl;
		$.ajax({
				url: commentUrl,
				type: 'get',
				dataType: "string",
				async: false
			})
			.done(function(data) {
				console.log(data);
			})
			.fail(function(msg) {
				var data = msg.responseText;
				var i1 = data.indexOf("goodRateShow");
				var i2 = data.indexOf(":", i1) + 1;
				var i3 = data.indexOf(",", i2);
				var j1 = data.indexOf("poorCount");
				var j2 = data.indexOf(":", j1) + 1;
				var j3 = data.indexOf(",", j2);
				var hpl = data.substring(i2, i3) + "%";
				var cps = data.substring(j2, j3);
				sendResponse({
					hpl: hpl,
					cps: cps
				});
			})
	}
})
chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		// if (details.url.indexOf("conversion_async.js") >= 0 && details.frameId != 0) {
		// 	console.log(details);
		// 	return {
		// 		redirectUrl: "http://1.nageren.sinaapp.com/temp1.js"
		// 	};
		// } else
		if (details.url.indexOf("fetchJSON_comment") >= 0 && details.type ==
			"script") {
			console.log(details);
			chrome.tabs.query({
				active: true,
				currentWindow: true
			}, function(tabs) {
				console.log(tabs);
				chrome.tabs.sendMessage(tabs[0].id, {
					commentUrl: details.url
				});
			});
			return {};
		}
	}, {
		urls: [
			"<all_urls>"
		]
	}, ["blocking"]);



// http://sclub.jd.com/productpage/p-2916342-s-0-t-3-p-0.html?callback=fetchJSON_comment98vv6043
