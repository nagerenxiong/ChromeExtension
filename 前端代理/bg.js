function start(url, callback) {
	$.ajax({
			url: url,
			type: 'get',
			async: false,
			dataType: "json"
		})
		.done(function(data) {
			callback(data);
		})
		.fail(function(msg) {
			callback(msg);
		})
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.type == 1) {
		var id = request.id;
		var url = 'http://dr.jd.com/articleJf/getSku.do?skuId=' + id;
		start(url, function(data) {
			if (data == null || !data.pcCommissionShare) {
				sendResponse("null");
				return;
			}
			var yjl = data.pcCommissionShare;
			var url1 =
				"https://sclub.jd.com/comment/productPageComments.action?productId=" +
				id +
				"&score=0&sortType=3&page=0&pageSize=10&callback=fetchJSON_comment98vv5739";
			start(url1, function(msg) {
				var data1 = msg.responseText;
				var i1 = data1.indexOf("goodRateShow");
				var i2 = data1.indexOf(":", i1) + 1;
				var i3 = data1.indexOf(",", i2);
				var j1 = data1.indexOf("poorCount");
				var j2 = data1.indexOf(":", j1) + 1;
				var j3 = data1.indexOf(",", j2);
				var hpl = data1.substring(i2, i3) + "%";
				var cps = data1.substring(j2, j3).replace(/\"/g, "");
				sendResponse({
					yjl: yjl,
					hpl: hpl,
					cps: cps
				});
			})
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
		$.ajax({
				url: 'http://121.40.94.246/jd/outh.php?pin=153234953-346068',
				async: false,
				type: 'get'
			})
			.done(function(data) {
				sendResponse(data);
			})
			.fail(function(msg) {
				sendResponse("error");
			})
	}
})